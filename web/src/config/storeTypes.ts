export type StoreType =
  | 'grocery'
  | 'medical'
  | 'restaurant'
  | 'apparel'
  | 'electronics'
  | 'services';

export type LineFieldType = 'text' | 'date' | 'number';

export type LineField = {
  key: string;
  label: string;
  type: LineFieldType;
  placeholder?: string;
};

export type BillExtra = 'service_charge' | 'table_no' | 'order_type' | 'notes';

export type StoreTypeConfig = {
  key: StoreType;
  label: string;
  emoji: string;
  blurb: string;
  itemLabel: string;
  qtyLabel: string;
  customerLabel?: string;
  lineFields: LineField[];
  lineDiscount: boolean;
  billExtras: BillExtra[];
  expiryAlerts: boolean;
  hideTax?: boolean;
  medicalExtras?: boolean;
};

export const STORE_TYPES: Record<StoreType, StoreTypeConfig> = {
  grocery: {
    key: 'grocery',
    label: 'Grocery / General Store',
    emoji: '🛒',
    blurb: 'Simple item · qty · rate billing.',
    itemLabel: 'Item',
    qtyLabel: 'Qty',
    lineFields: [],
    lineDiscount: false,
    billExtras: [],
    expiryAlerts: false,
    hideTax: true,
  },
  medical: {
    key: 'medical',
    label: 'Medical / Pharmacy',
    emoji: '💊',
    blurb: 'Patient & doctor info, batch number, expiry date.',
    itemLabel: 'Medicine',
    qtyLabel: 'Qty',
    customerLabel: 'Patient Name',
    lineFields: [
      { key: 'batch_no', label: 'Batch no.', type: 'text', placeholder: 'B-1234' },
      { key: 'expiry_date', label: 'Expiry', type: 'date' },
    ],
    lineDiscount: false,
    billExtras: [],
    expiryAlerts: true,
    hideTax: true,
    medicalExtras: true,
  },
  restaurant: {
    key: 'restaurant',
    label: 'Restaurant / Café',
    emoji: '🍽️',
    blurb: 'Table number and dine-in / takeaway order options.',
    itemLabel: 'Dish',
    qtyLabel: 'Qty',
    lineFields: [],
    lineDiscount: false,
    billExtras: ['table_no', 'order_type'],
    expiryAlerts: false,
    hideTax: true,
  },
  apparel: {
    key: 'apparel',
    label: 'Retail / Apparel',
    emoji: '👕',
    blurb: 'Size / variant and HSN code.',
    itemLabel: 'Product',
    qtyLabel: 'Qty',
    lineFields: [
      { key: 'size', label: 'Size / Variant', type: 'text', placeholder: 'M / Red' },
      { key: 'hsn', label: 'HSN', type: 'text', placeholder: 'HSN code' },
    ],
    lineDiscount: false,
    billExtras: [],
    expiryAlerts: false,
    hideTax: true,
  },
  electronics: {
    key: 'electronics',
    label: 'Electronics / Hardware',
    emoji: '🔌',
    blurb: 'Serial / model number and warranty period.',
    itemLabel: 'Product',
    qtyLabel: 'Qty',
    lineFields: [
      { key: 'serial', label: 'Serial / Model', type: 'text', placeholder: 'SN-000' },
      { key: 'warranty', label: 'Warranty (mo.)', type: 'number', placeholder: '12' },
    ],
    lineDiscount: false,
    billExtras: [],
    expiryAlerts: false,
    hideTax: true,
  },
  services: {
    key: 'services',
    label: 'Services / Freelance',
    emoji: '🧑‍💻',
    blurb: 'Bill by description × hours × rate, with notes.',
    itemLabel: 'Service / Description',
    qtyLabel: 'Hours',
    lineFields: [],
    lineDiscount: false,
    billExtras: ['notes'],
    expiryAlerts: false,
    hideTax: true,
  },
};

export const STORE_TYPE_LIST = Object.values(STORE_TYPES);

export function getStoreConfig(t: string | null | undefined): StoreTypeConfig {
  return STORE_TYPES[(t as StoreType) ?? 'grocery'] ?? STORE_TYPES.grocery;
}
