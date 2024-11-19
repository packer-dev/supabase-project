/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from "@/app/containers/topics/course.service";
import supabase from "@/supabase";

export const response = [
  {
    id: Math.random().toString(36).substring(2, 15),
    user: {
      id: Math.random().toString(36).substring(2, 15),
      name: "John Doe",
      email: "john.doe@example.com",
    },
    course: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Bức phá IELTS 3.0 - 4.5+",
      description: "Bức phá IELTS 3.0 - 4.5+",
      price: 1000000,
      discount_percent: 6,
      modules: 10,
      updated_at: new Date().toISOString().toString(),
    },
    price: 99.99,
    status: "completed",
    updated_at: new Date("2024-11-18T10:00:00Z").toString(),
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    user: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    course: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Phát âm tiếng anh",
      description: "Phát âm tiếng anh",
      price: 1000000,
      discount_percent: 6,
      modules: 10,
      updated_at: new Date().toISOString().toString(),
    },
    price: 149.99,
    status: "pending",
    updated_at: new Date("2024-11-19T15:30:00Z").toString(),
  },
  {
    id: Math.random().toString().substring(1, 8),
    user: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Alice Brown",
      email: "alice.brown@example.com",
    },
    course: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Phát âm tiếng anh",
      description: "Phát âm tiếng anh",
      price: 1000000,
      discount_percent: 6,
      modules: 10,
      updated_at: new Date().toISOString(),
    },
    price: 199.99,
    status: "canceled",
    updated_at: new Date("2024-11-18T08:45:00Z").toString(),
  },
  {
    id: Math.random().toString().substring(1, 8),
    user: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Alice Brown",
      email: "alice.brown@example.com",
    },
    course: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Phát âm tiếng anh",
      description: "Phát âm tiếng anh",
      price: 1000000,
      discount_percent: 6,
      modules: 10,
      updated_at: new Date().toISOString(),
    },
    price: 199.99,
    status: "done",
    updated_at: new Date("2024-11-18T08:45:00Z").toString(),
  },
  {
    id: Math.random().toString().substring(1, 8),
    user: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Alice Brown",
      email: "alice.brown@example.com",
    },
    course: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Phát âm tiếng anh",
      description: "Phát âm tiếng anh",
      price: 1000000,
      discount_percent: 6,
      modules: 10,
      updated_at: new Date().toISOString(),
    },
    price: 199.99,
    status: "canceled",
    updated_at: new Date("2024-11-18T08:45:00Z").toString(),
  },
  {
    id: Math.random().toString().substring(1, 8),
    user: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Alice Brown",
      email: "alice.brown@example.com",
    },
    course: {
      id: Math.random().toString(36).substring(2, 15),
      name: "Phát âm tiếng anh",
      description: "Phát âm tiếng anh",
      price: 1000000,
      discount_percent: 6,
      modules: 10,
      updated_at: new Date().toISOString(),
    },
    price: 199.99,
    status: "pending",
    updated_at: new Date("2024-11-18T08:45:00Z").toString(),
  },
];

export type Order = {
  id: string;
  user: any;
  course: Course;
  price: number;
  status: "pending" | "done" | "canceled";
  updated_at: string;
  is_discount?: boolean;
};

const topics = {
  search: async (value: string, status: string) => {
    return new Promise<{
      data: {
        list: Order[];
        result: {
          all: number;
          done: number;
          canceled: number;
          pending: number;
        };
      };
    }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: {
              list: response
                .filter((item) =>
                  status === "all" ? true : item.status === status
                )
                .filter((item) =>
                  item.user.name.toLowerCase().includes(value.toLowerCase())
                ),
              result: {
                all: response.length,
                done: response.filter((item) => item.status === "done").length,
                canceled: response.filter((item) => item.status === "canceled")
                  .length,
                pending: response.filter((item) => item.status === "pending")
                  .length,
              },
            },
          }),
        300
      )
    );
  },
  //   search: async (value: string): Promise<Page<Topic>> => {
  //     const { data, error } = await supabase
  //       .from("orders")
  //       .select(`*`)
  //       .like("name", `%${value}%`);

  //     if (error) throw error;
  //     return { data };
  //   },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id);
    if (error) throw error;
    return data[0] || {};
  },
  insert: async (payload: Order) => {
    const { data, error } = await supabase.from("exam_topics").insert(payload);
    if (error) throw error;
    return data;
  },
  update: async (payload: Order) => {
    const { data, error } = await supabase
      .from("orders")
      .update(payload)
      .eq("id", payload.id);
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
  },
};

export default topics;
