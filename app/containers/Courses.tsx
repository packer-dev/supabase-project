/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import supabase from '@/supabase';
import { useQuery } from '@tanstack/react-query';

const Courses = () => {
  const { data } = useQuery({
    queryKey: ['fetch'],
    queryFn: async () => {
      const params = {
        course_id: 'e61c6db4-3b1a-446c-8381-5d70791331d1',
        module_id: '4e7e7cff-0f71-4b54-b2d1-894b984cc4b7',
        lesson_id: '7f08a421-dc97-45b7-add9-867d170531bd',
      };
      const fetch = supabase.from('courses').select(
        `
        *
        ${
          params.module_id
            ? `,modules (
          *
          ${
            params?.lesson_id
              ? `,lessons (
            *
          )`
              : ''
          }
        )`
            : ''
        }
      `
      );
      let result: any;
      let repsonse: any;
      if (params.lesson_id) {
        result = await fetch
          .eq('id', 'e61c6db4-3b1a-446c-8381-5d70791331d1')
          .eq('modules.id', '4e7e7cff-0f71-4b54-b2d1-894b984cc4b7')
          .eq('modules.lessons.id', '7f08a421-dc97-45b7-add9-867d170531bd');
      } else if (params.module_id) {
        result = await fetch
          .eq('id', 'e61c6db4-3b1a-446c-8381-5d70791331d1')
          .eq('modules.id', '4e7e7cff-0f71-4b54-b2d1-894b984cc4b7');
      } else {
        result = await fetch
          .eq('id', 'e61c6db4-3b1a-446c-8381-5d70791331d1')
          .eq('modules.id', '4e7e7cff-0f71-4b54-b2d1-894b984cc4b7');
      }
      return repsonse;
    },
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default Courses;
