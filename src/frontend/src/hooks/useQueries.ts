import { createActor } from "@/backend";
import {
  CategoryFilter,
  type JobNotice,
  type MobileRecharge,
  type Order,
  OrderStatus,
  type Product,
  RechargeOperator,
  type Reseller,
  type ResellerBalance,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(filter: CategoryFilter = CategoryFilter.all) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchProducts(term: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchProducts(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}

export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrdersByReseller(resellerId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders", "reseller", resellerId?.toString()],
    queryFn: async () => {
      if (!actor || !resellerId) return [];
      return actor.getOrdersByReseller(resellerId);
    },
    enabled: !!actor && !isFetching && !!resellerId,
  });
}

export function useResellerBalance(resellerId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ResellerBalance | null>({
    queryKey: ["balance", resellerId?.toString()],
    queryFn: async () => {
      if (!actor || !resellerId) return null;
      return actor.getResellerBalance(resellerId);
    },
    enabled: !!actor && !isFetching && !!resellerId,
  });
}

export function useJobNotices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<JobNotice[]>({
    queryKey: ["jobNotices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobNotices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    Order,
    Error,
    {
      customerName: string;
      customerPhone: string;
      customerAddress: string;
      location: string;
      productId: bigint;
      size: string;
      quantity: bigint;
      resellerId: bigint;
    }
  >({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.placeOrder(
        data.customerName,
        data.customerPhone,
        data.customerAddress,
        data.location,
        data.productId,
        data.size,
        data.quantity,
        data.resellerId,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useSubmitRecharge() {
  const { actor } = useActor(createActor);
  return useMutation<
    MobileRecharge,
    Error,
    { phone: string; operator: RechargeOperator; amount: bigint }
  >({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitRecharge(data.phone, data.operator, data.amount);
    },
  });
}

export function useCreateResellerAccount() {
  const { actor } = useActor(createActor);
  return useMutation<
    Reseller,
    Error,
    { name: string; phone: string; email: string; address: string }
  >({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createResellerAccount(
        data.name,
        data.phone,
        data.email,
        data.address,
      );
    },
  });
}

export type {
  Product,
  Order,
  Reseller,
  JobNotice,
  MobileRecharge,
  ResellerBalance,
};
export { CategoryFilter, OrderStatus, RechargeOperator };
