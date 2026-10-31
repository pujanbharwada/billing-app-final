export type RowForValidation = {
  item_name: string;
  qty: string;
  rate: string;
};

export type ValidateBillParams = {
  customerName: string;
  rows: RowForValidation[];
  isFrozen: boolean;
  isSubscriptionActive: boolean;
};

export function validateBill(params: ValidateBillParams): string[] {

  const errors: string[] = [];
  if (!params.isSubscriptionActive) {
    errors.push('Your trial / subscription has expired.');
  }
  if (params.isFrozen) {
    errors.push('This customer account is frozen and cannot be billed.');
  }
  if (!params.customerName.trim()) {
    errors.push('Customer name is empty.');
  }

  const touchedRows = params.rows.filter(
    r => r.item_name.trim() || r.qty.trim() || r.rate.trim(),
  );
  if (touchedRows.length === 0) {
    errors.push('Add at least one item.');
  }
  params.rows.forEach((row, index) => {

    const hasName = !!row.item_name.trim();

    const hasQty = !!row.qty.trim();

    const hasRate = !!row.rate.trim();

    const touched = hasName || hasQty || hasRate;
    if (!touched) return;

    const n = index + 1;
    if (!hasName) errors.push(`Row ${n}: Item name is empty.`);
    if (!hasQty) {
      errors.push(`Row ${n}: Qty is empty.`);
    } else if (!Number.isFinite(Number(row.qty)) || Number(row.qty) <= 0) {
      errors.push(`Row ${n}: Qty must be a number greater than 0.`);
    }
    if (!hasRate) {
      errors.push(`Row ${n}: Rate is empty.`);
    } else if (!Number.isFinite(Number(row.rate)) || Number(row.rate) < 0) {
      errors.push(`Row ${n}: Rate must be a valid number.`);
    }
  });
  return errors;
}
