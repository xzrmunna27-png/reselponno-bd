import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ResellerBalance {
    balance: bigint;
    resellerId: ResellerId;
    transactions: Array<BalanceTransaction>;
}
export type Timestamp = bigint;
export interface BalanceTransaction {
    createdAt: Timestamp;
    description: string;
    amount: bigint;
}
export interface Reseller {
    id: ResellerId;
    totalOrders: bigint;
    name: string;
    joinedAt: Timestamp;
    isActive: boolean;
    email: string;
    address: string;
    totalEarnings: bigint;
    phone: string;
}
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    customerPhone: string;
    createdAt: Timestamp;
    size: string;
    productId: ProductId;
    customerAddress: string;
    resellerId: ResellerId;
    quantity: bigint;
    totalPrice: bigint;
    location: string;
}
export type RechargeId = bigint;
export type ResellerId = bigint;
export interface MobileRecharge {
    id: RechargeId;
    status: RechargeStatus;
    operator: RechargeOperator;
    createdAt: Timestamp;
    phone: string;
    amount: bigint;
}
export type ProductId = bigint;
export type JobNoticeId = bigint;
export interface JobNotice {
    id: JobNoticeId;
    title: string;
    salary: string;
    description: string;
    deadline: string;
    isActive: boolean;
    company: string;
    location: string;
}
export interface Product {
    id: ProductId;
    originalPrice: bigint;
    resellerPrice: bigint;
    name: string;
    description: string;
    isActive: boolean;
    imageEmoji: string;
    sizes: Array<string>;
    stock: bigint;
    category: ProductCategory;
}
export type OrderId = bigint;
export enum CategoryFilter {
    all = "all",
    fashion = "fashion",
    electronics = "electronics"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum ProductCategory {
    fashion = "fashion",
    electronics = "electronics"
}
export enum RechargeOperator {
    banglalink = "banglalink",
    grameenphone = "grameenphone",
    robi = "robi",
    airtel = "airtel",
    teletalk = "teletalk"
}
export enum RechargeStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export interface backendInterface {
    adminAddJobNotice(adminPassword: string, title: string, company: string, description: string, deadline: string, salary: string, location: string): Promise<JobNotice>;
    adminAddProduct(adminPassword: string, name: string, category: ProductCategory, originalPrice: bigint, resellerPrice: bigint, sizes: Array<string>, stock: bigint, description: string, imageEmoji: string): Promise<Product>;
    adminDeactivateJobNotice(adminPassword: string, id: JobNoticeId): Promise<boolean>;
    adminDeleteProduct(adminPassword: string, id: ProductId): Promise<boolean>;
    adminEditProduct(adminPassword: string, id: ProductId, name: string, category: ProductCategory, originalPrice: bigint, resellerPrice: bigint, sizes: Array<string>, stock: bigint, description: string, imageEmoji: string, isActive: boolean): Promise<boolean>;
    adminGetAllOrders(adminPassword: string): Promise<Array<Order>>;
    adminGetAllRecharges(adminPassword: string): Promise<Array<MobileRecharge>>;
    adminGetAllResellers(adminPassword: string): Promise<Array<Reseller>>;
    adminLogin(password: string): Promise<boolean>;
    adminUpdateOrderStatus(adminPassword: string, id: OrderId, status: OrderStatus): Promise<boolean>;
    createResellerAccount(name: string, phone: string, email: string, address: string): Promise<Reseller>;
    getJobNotices(): Promise<Array<JobNotice>>;
    getOrders(): Promise<Array<Order>>;
    getOrdersByReseller(resellerId: ResellerId): Promise<Array<Order>>;
    getProductById(id: ProductId): Promise<Product | null>;
    getProducts(categoryFilter: CategoryFilter): Promise<Array<Product>>;
    getResellerBalance(resellerId: ResellerId): Promise<ResellerBalance>;
    getResellerById(id: ResellerId): Promise<Reseller | null>;
    placeOrder(customerName: string, customerPhone: string, customerAddress: string, location: string, productId: ProductId, size: string, quantity: bigint, resellerId: ResellerId): Promise<Order>;
    searchProducts(term: string): Promise<Array<Product>>;
    submitRecharge(phone: string, operator: RechargeOperator, amount: bigint): Promise<MobileRecharge>;
}
