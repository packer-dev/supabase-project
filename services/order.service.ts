/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@/app/containers/topics/course.service';
import supabase from '@/supabase';

export type Order = {
  id: string;
  users: any;
  courses: Course;
  price: number;
  status: 'pending' | 'done' | 'canceled';
  updated_at: string;
  is_discount?: boolean;
};

const topics = {
  search: async (
    value: string,
    status: string
  ): Promise<{
    data: Order[];
    result: {
      all: number;
      done: number;
      canceled: number;
      pending: number;
    };
  }> => {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
      *,
      users(*),
      courses(*) 
    `
      )
      .ilike('users.full_name', `%${value}%`)
      .order('updated_at');

    if (error) throw error;
    return {
      data: data.filter((item) =>
        status === 'all' ? true : item.status === status
      ),
      // .filter((item) =>
      //   item.user.name.toLowerCase().includes(value.toLowerCase())
      // )
      result: {
        all: data.length,
        done: data.filter((item) => item.status === 'done').length,
        canceled: data.filter((item) => item.status === 'canceled').length,
        pending: data.filter((item) => item.status === 'pending').length,
      },
    };
  },
  exportData: async (value: string, status: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
    *,
    users(*),
    courses(*) 
  `
      )
      .ilike('users.full_name', `%${value}%`)
      .ilike(
        'status',
        `%${status.toLowerCase() === 'all' ? '' : status.toLowerCase()}%`
      )
      .order('updated_at');
    if (error) throw error;
    return data;
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return data[0] || {};
  },
  insert: async (payload: Order) => {
    const { data, error } = await supabase.from('orders').insert(payload);
    if (error) throw error;
    return data;
  },
  update: async (payload: Order) => {
    const { data, error } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', payload.id);
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) throw error;
  },
};

export default topics;
