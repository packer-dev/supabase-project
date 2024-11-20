import { Page } from '@/shared/models';
import supabase from '@/supabase';

export type Modules = {
  id: string;
  name: string;
  description: string;
  lessons: number;
  update_at: string;
};

const modules = {
  // search: async (value: string): Promise<Page<Modules>> => {
  //   return {
  //     data: [
  //       {
  //         id: Math.random().toString(36).substring(2, 15),
  //         name: 'Unit start',
  //         description: 'Unit start',
  //         lessons: 10,
  //         update_at: new Date().toISOString(),
  //       },
  //       {
  //         id: Math.random().toString(36).substring(2, 15),
  //         name: 'Unit 1: Daily routine',
  //         description: 'Unit 1: Daily routine',
  //         lessons: 10,
  //         update_at: new Date().toISOString(),
  //       },
  //     ].filter((module) => module.name.includes(value)),
  //   };
  // },
  search: async (value: string): Promise<Page<Modules>> => {
    const { data, error } = await supabase
      .from('modules')
      .select(`*`)
      .like('name', `%${value}%`);
    if (error) throw error;
    return {
      data,
    };
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return data;
  },
  insert: async (payload: Modules): Promise<Page<Modules>> => {
    const { data, error } = await supabase
      .from('modules')
      .insert({ ...payload });
    if (error) throw error;
    return data;
  },
  update: async (payload: Modules): Promise<Page<Modules>> => {
    const { data, error } = await supabase
      .from('modules')
      .update({ ...payload });
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { data, error } = await supabase
      .from('modules')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return data;
  },
};

export default modules;
