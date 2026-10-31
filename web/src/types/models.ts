export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  trial_start: string;
  trial_end: string | null;
  status: 'frozen' | 'trial' | 'active' | 'expired';
  plan?: string | null;
  inventory_enabled?: boolean;
}

export interface SubscriptionPayment {
  id: string;
  user_id: string;
  user_email: string;
  plan_key: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Customer {
  id: string;
  user_id: string;
  customer_name: string;
  is_frozen: boolean;
  created_at: string;
}

export interface Item {
  id: string;
  user_id: string;
  item_name: string;
  default_rate: number | null;
  created_at: string;
  track_stock?: boolean;
  stock_qty?: number;
  reorder_level?: number;
  cost_price?: number | null;
}

export interface StockMovement {
  id: string;
  user_id: string;
  item_id: string;
  change: number;
  reason: 'sale' | 'restock' | 'adjustment' | 'return' | 'opening';
  bill_id?: string | null;
  note?: string | null;
  created_at: string;
}

export interface Bill {
  id: string;
  user_id: string;
  customer_id: string | null;
  customer_name: string;
  bill_number: string;
  total_amount: number;
  created_at: string;
  subtotal?: number;
  discount_amount?: number;
  tax_percent?: number;
  tax_amount?: number;
  extra?: BillExtra;
}

export interface BillExtra {
  store_type?: string;
  discount_percent?: number;
  service_charge_percent?: number;
  service_charge_amount?: number;
  table_no?: string;
  order_type?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface BillItem {
  id: string;
  bill_id: string;
  item_id?: string | null;
  item_name: string;
  qty: number;
  rate: number;
  total: number;
  discount?: number;
  meta?: Record<string, string>;
}

export interface Settings {
  user_id: string;
  store_type: string;
  shop_name: string | null;
  logo_url: string | null;
  phone: string | null;
  address: string | null;
  updated_at?: string;
}
