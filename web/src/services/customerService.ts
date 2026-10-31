import { supabase, escapeLike } from '../lib/supabase';

import type { Customer } from '../types/models';

export async function listCustomers(): Promise<Customer[]> {

  const { data: userData } = await supabase.auth.getUser();

  const uid = userData.user?.id;
  if (!uid) return [];

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', uid)
    .order('customer_name', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Customer[];
}

export async function fetchCustomersPage(params: {
  search?: string;
  limit: number;
  offset: number;
}): Promise<Customer[]> {

  const { data: userData } = await supabase.auth.getUser();

  const uid = userData.user?.id;
  if (!uid) return [];

  let query = supabase
    .from('customers')
    .select('*')
    .eq('user_id', uid)
    .order('customer_name', { ascending: true })
    .range(params.offset, params.offset + params.limit - 1);

  const s = params.search?.trim();
  if (s) query = query.ilike('customer_name', `%${escapeLike(s)}%`);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Customer[];
}

export async function searchCustomers(
  query: string,
  limit = 8,
): Promise<Customer[]> {

  const { data: userData } = await supabase.auth.getUser();

  const uid = userData.user?.id;
  if (!uid) return [];

  const q = query.trim();
  if (!q) return [];

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', uid)
    .ilike('customer_name', `${escapeLike(q)}%`)
    .order('customer_name', { ascending: true })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Customer[];
}

export async function createCustomer(
  userId: string,
  name: string,
): Promise<Customer> {

  const { data, error } = await supabase
    .from('customers')
    .insert({ user_id: userId, customer_name: name.trim() })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Customer;
}

export async function updateCustomerName(
  id: string,
  name: string,
): Promise<void> {

  const { data: userData } = await supabase.auth.getUser();

  const uid = userData.user?.id;

  let query = supabase
    .from('customers')
    .update({ customer_name: name.trim() })
    .eq('id', id);
  if (uid) query = query.eq('user_id', uid);

  const { error } = await query;
  if (error) throw new Error(error.message);
}

export async function setFrozen(id: string, isFrozen: boolean): Promise<void> {

  const { data: userData } = await supabase.auth.getUser();

  const uid = userData.user?.id;

  let query = supabase
    .from('customers')
    .update({ is_frozen: isFrozen })
    .eq('id', id);
  if (uid) query = query.eq('user_id', uid);

  const { error } = await query;
  if (error) throw new Error(error.message);
}

export async function deleteCustomer(id: string): Promise<void> {

  const { data: userData } = await supabase.auth.getUser();

  const uid = userData.user?.id;

  let query = supabase.from('customers').delete().eq('id', id);
  if (uid) query = query.eq('user_id', uid);

  const { error } = await query;
  if (error) throw new Error(error.message);
}

export async function findCustomerByName(name: string): Promise<Customer | null> {

  const { data: userData } = await supabase.auth.getUser();

  const uid = userData.user?.id;
  if (!uid) return null;

  const trimmed = name.trim();
  if (!trimmed) return null;

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', uid)
    .ilike('customer_name', escapeLike(trimmed))
    .limit(1);
  if (error) throw new Error(error.message);
  return data && data.length > 0 ? (data[0] as Customer) : null;
}

export async function findOrCreateCustomer(
  userId: string,
  name: string,
): Promise<Customer> {

  const trimmed = name.trim();

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', userId)
    .ilike('customer_name', escapeLike(trimmed))
    .limit(1);
  if (error) throw new Error(error.message);
  if (data && data.length > 0) return data[0] as Customer;
  return createCustomer(userId, trimmed);
}
