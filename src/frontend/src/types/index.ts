export type ActiveTab = "home" | "products" | "daily" | "profile";

export interface ServiceItem {
  id: number;
  label: string;
  icon: string;
}

export interface ModalState {
  type: "service" | "balance" | "order" | "notice" | null;
  serviceName?: string;
}
