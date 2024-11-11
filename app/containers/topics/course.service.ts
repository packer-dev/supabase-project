import { Page } from "@/shared/models";
import supabase from "@/supabase";

export type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_percent: number;
  modules: number;
  updated_at?: string;
  sale_date_from?: string;
  sale_date_to?: string;
};

const course = {
  // search: async (value: string): Promise<Page<Course>> => {
  //   return {
  //     data: [
  //       {
  //         id: Math.random().toString(36).substring(2, 15),
  //         name: "Bức phá IELTS 3.0 - 4.5+",
  //         description: "Bức phá IELTS 3.0 - 4.5+",
  //         price: 1000000,
  //         discount_percent: 6,
  //         modules: 10,
  //         updated_at: new Date().toISOString(),
  //       },
  //       {
  //         id: Math.random().toString(36).substring(2, 15),
  //         name: "Phát âm tiếng anh",
  //         description: "Phát âm tiếng anh",
  //         price: 1000000,
  //         discount_percent: 6,
  //         modules: 10,
  //         updated_at: new Date().toISOString(),
  //       },
  //     ].filter((course) => course.name.includes(value)),
  //   };
  // },
  search: async (value: string): Promise<Page<Course>> => {
    const { data, error } = await supabase
      .from("courses")
      .select(`*`)
      .like("name", `%${value}%`);
    if (error) throw error;
    return {
      data,
    };
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id);
    if (error) throw error;
    return data;
  },
  insert: async (payload: Course): Promise<Page<Course>> => {
    const { data, error } = await supabase
      .from("courses")
      .insert({ ...payload });
    if (error) throw error;
    return data;
  },
  update: async (payload: Course): Promise<Page<Course>> => {
    const { data, error } = await supabase
      .from("courses")
      .update({ ...payload });
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { data, error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  },
};

export default course;
