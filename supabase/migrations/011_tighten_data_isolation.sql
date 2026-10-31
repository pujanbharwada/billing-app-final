-- ===========================================================================
-- MIGRATION 011 — Complete Multi-Tenant Account Isolation & Leak Prevention
-- ---------------------------------------------------------------------------
-- HOW TO RUN: Supabase Dashboard → SQL Editor → New query → paste this → Run.
--
-- Fixes:
-- 1. Drops all global "using (true)" and broad storefront policies that caused
--    cross-account data leakage.
-- 2. Restores strict tenant isolation: each shopkeeper can ONLY see their own
--    bills, line items, customers, items, inventory, and settings.
-- 3. Keeps storefront ordering functional without compromising privacy.
-- ===========================================================================

-- 1. BILLS TABLE ------------------------------------------------------------
drop policy if exists "Bills readable publicly for storefront" on public.bills;
drop policy if exists "Bills selectable by owner or storefront" on public.bills;
drop policy if exists "Bills selectable by owner" on public.bills;
drop policy if exists "own bills" on public.bills;
drop policy if exists "Bills insertable publicly for storefront" on public.bills;
drop policy if exists "Bills insertable by owner or storefront" on public.bills;
drop policy if exists "bills_owner_select" on public.bills;
drop policy if exists "bills_insert" on public.bills;
drop policy if exists "bills_owner_update" on public.bills;
drop policy if exists "bills_owner_delete" on public.bills;

alter table public.bills enable row level security;

-- Only the bill owner can view their bills (no leakage across accounts)
create policy "bills_owner_select"
  on public.bills for select
  using (auth.uid() = user_id);

-- Authenticated owner can insert bills; unauthenticated storefront customers can place online orders
create policy "bills_insert"
  on public.bills for insert
  with check (auth.uid() = user_id or auth.role() = 'anon');

-- Only the bill owner can update their bills
create policy "bills_owner_update"
  on public.bills for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Only the bill owner can delete their bills
create policy "bills_owner_delete"
  on public.bills for delete
  using (auth.uid() = user_id);


-- 2. BILL_ITEMS TABLE -------------------------------------------------------
drop policy if exists "Bill items readable publicly for storefront" on public.bill_items;
drop policy if exists "Bill items selectable by owner or storefront" on public.bill_items;
drop policy if exists "Bill items selectable by owner" on public.bill_items;
drop policy if exists "own bill_items" on public.bill_items;
drop policy if exists "Bill items insertable publicly for storefront" on public.bill_items;
drop policy if exists "bill_items_owner_select" on public.bill_items;
drop policy if exists "bill_items_insert" on public.bill_items;
drop policy if exists "bill_items_owner_update" on public.bill_items;
drop policy if exists "bill_items_owner_delete" on public.bill_items;

alter table public.bill_items enable row level security;

-- Only the bill owner can view bill items
create policy "bill_items_owner_select"
  on public.bill_items for select
  using (
    exists (
      select 1 from public.bills b
      where b.id = bill_items.bill_id
      and b.user_id = auth.uid()
    )
  );

-- Owner can insert line items; storefront anon can insert lines for online orders
create policy "bill_items_insert"
  on public.bill_items for insert
  with check (
    exists (
      select 1 from public.bills b
      where b.id = bill_items.bill_id
      and (b.user_id = auth.uid() or auth.role() = 'anon')
    )
  );

-- Only the bill owner can update line items
create policy "bill_items_owner_update"
  on public.bill_items for update
  using (
    exists (
      select 1 from public.bills b
      where b.id = bill_items.bill_id
      and b.user_id = auth.uid()
    )
  );

-- Only the bill owner can delete line items
create policy "bill_items_owner_delete"
  on public.bill_items for delete
  using (
    exists (
      select 1 from public.bills b
      where b.id = bill_items.bill_id
      and b.user_id = auth.uid()
    )
  );


-- 3. CUSTOMERS TABLE --------------------------------------------------------
drop policy if exists "Customers selectable by owner" on public.customers;
drop policy if exists "own customers" on public.customers;
drop policy if exists "customers_owner_all" on public.customers;

alter table public.customers enable row level security;

create policy "customers_owner_all"
  on public.customers for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- 4. ITEMS TABLE ------------------------------------------------------------
drop policy if exists "Items readable publicly for storefront" on public.items;
drop policy if exists "Items selectable by owner" on public.items;
drop policy if exists "own items" on public.items;
drop policy if exists "items_select" on public.items;
drop policy if exists "items_owner_insert" on public.items;
drop policy if exists "items_owner_update" on public.items;
drop policy if exists "items_owner_delete" on public.items;

alter table public.items enable row level security;

-- Owner can select their items; anon visitors can browse catalog on storefront
create policy "items_select"
  on public.items for select
  using (auth.uid() = user_id or auth.role() = 'anon');

create policy "items_owner_insert"
  on public.items for insert
  with check (auth.uid() = user_id);

create policy "items_owner_update"
  on public.items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "items_owner_delete"
  on public.items for delete
  using (auth.uid() = user_id);


-- 5. SETTINGS TABLE ---------------------------------------------------------
drop policy if exists "Settings readable publicly for storefront" on public.settings;
drop policy if exists "Settings selectable by owner" on public.settings;
drop policy if exists "own settings" on public.settings;
drop policy if exists "settings_select" on public.settings;
drop policy if exists "settings_owner_insert" on public.settings;
drop policy if exists "settings_owner_update" on public.settings;
drop policy if exists "settings_owner_delete" on public.settings;

alter table public.settings enable row level security;

-- Owner can read their settings; anon visitors can read shop name/logo on storefront
create policy "settings_select"
  on public.settings for select
  using (auth.uid() = user_id or auth.role() = 'anon');

create policy "settings_owner_insert"
  on public.settings for insert
  with check (auth.uid() = user_id);

create policy "settings_owner_update"
  on public.settings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "settings_owner_delete"
  on public.settings for delete
  using (auth.uid() = user_id);


-- 6. STOCK MOVEMENTS TABLE --------------------------------------------------
drop policy if exists "Stock movements selectable by owner" on public.stock_movements;
drop policy if exists "own stock_movements" on public.stock_movements;
drop policy if exists "stock_movements_owner_all" on public.stock_movements;

alter table public.stock_movements enable row level security;

create policy "stock_movements_owner_all"
  on public.stock_movements for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
