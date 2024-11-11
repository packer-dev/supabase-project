import { Page } from "@/shared/models";
import supabase from "@/supabase";
export type Lesson = {
  id: string;
  name: string;
  description: string;
  lessons: number;
  update_at: string;
};
const lessons = {
  // search: async (value: string): Promise<Page<Lesson>> => {
  //   return {
  //     data: [
  //       {
  //         id: Math.random().toString(36).substring(2, 15),
  //         name: "Tóm tắt kiến thức unit 1",
  //         description: "Tóm tắt kiến thức unit 1",
  //         lessons: 10,
  //         update_at: new Date().toISOString(),
  //       },
  //       {
  //         id: Math.random().toString(36).substring(2, 15),
  //         name: "Tóm tắt kiến thức unit 2",
  //         description: "Tóm tắt kiến thức unit 2",
  //         lessons: 10,
  //         update_at: new Date().toISOString(),
  //       },
  //     ].filter((lesson) => lesson.name.includes(value)),
  //   };
  // },
  search: async (value: string): Promise<Page<Lesson>> => {
    const { data, error } = await supabase
      .from("lessons")
      .select(`*`)
      .like("name", `%${value}%`);
    if (error) throw error;
    return {
      data,
    };
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", id);
    if (error) throw error;
    return data;
  },
  insert: async (payload: Lesson): Promise<Page<Lesson>> => {
    const { data, error } = await supabase
      .from("lessons")
      .insert({ ...payload });
    if (error) throw error;
    return data;
  },
  update: async (payload: Lesson): Promise<Page<Lesson>> => {
    const { data, error } = await supabase
      .from("lessons")
      .update({ ...payload });
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { data, error } = await supabase
      .from("lessons")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  },
};

export default lessons;
