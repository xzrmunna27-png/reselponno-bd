export type ActiveTab = "home" | "products" | "daily" | "profile";

export interface ServiceItem {
  id: number;
  label: string;
  icon: string;
}

export interface ModalState {
  type:
    | "service"
    | "balance"
    | "order"
    | "notice"
    | "resellerProducts"
    | "jobNotice"
    | "recharge"
    | "reseller"
    | null;
  serviceName?: string;
  extra?: Record<string, string | number>;
}

export interface AppState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentReseller: ResellerSession | null;
}

export interface ResellerSession {
  id: bigint;
  name: string;
  phone: string;
}

// Re-export backend types for convenience
export type {
  Product,
  Order,
  Reseller,
  JobNotice,
  MobileRecharge,
  ResellerBalance,
} from "@/backend";
export {
  CategoryFilter,
  OrderStatus,
  ProductCategory,
  RechargeOperator,
  RechargeStatus,
} from "@/backend";
