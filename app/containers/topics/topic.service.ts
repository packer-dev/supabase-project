import { Page } from "@/shared/models";
import supabase from "@/supabase";

export type Topic = {
  id: string;
  name: string;
  created_at: string;
};

const topics = {
  search: async (value: string): Promise<Page<Topic>> => {
    const { data, error } = await supabase
      .from("exam_topics")
      .select(`*`)
      .like("name", `%${value}%`);

    if (error) throw error;
    return data;
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("exam_topics")
      .select("*")
      .eq("id", id);
    if (error) throw error;
    return data;
  },
  insert: async (payload: Topic) => {
    const { data, error } = await supabase.from("exam_topics").insert({
      name: payload.name,
      created_at: payload.created_at,
    });
    if (error) throw error;
    return data;
  },
  update: async (payload: Topic) => {
    const { data, error } = await supabase.from("exam_topics").update({
      id: payload.id,
      name: payload.name,
      created_at: payload.created_at,
    });
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("exam_topics").delete().eq("id", id);
    if (error) throw error;
  },
};

export default topics;
