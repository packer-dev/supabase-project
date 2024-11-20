'use client';

import { DataTable } from '@/components/shared/DataTable';
import { useQuery } from '@tanstack/react-query';
import { columns } from './constants';
import { Input } from '@/components/ui/input';
import { useApi } from '@/services/api';
import { useState } from 'react';
import CreateExampleTopic from './CreateTopic';
import ConfirmDeleteTopic from '../table-common/ConfirmDelete';

const Topic = () => {
  const [value, setValue] = useState('');
  const [examTopicId, setTopicId] = useState<string | null>('');
  const [showTopic, setShowTopic] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { examTopic } = useApi();
  const fetchTopic = async () => {
    return examTopic.search(value);
  };
  const { data, isLoading, isPending, isRefetching, refetch } = useQuery({
    queryKey: ['courses', value],
    queryFn: fetchTopic,
  });
  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-4">
      <div className="flex justify-between">
        <div className="w-1/2">
          <Input
            className="h-8 w-1/2 bg-white"
            placeholder="Enter name to find..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <CreateExampleTopic
          refetch={refetch}
          id={examTopicId}
          open={showTopic}
          onOpenChange={(open) => {
            setShowTopic(open);
          }}
        />
      </div>
      <div className="p-4 bg-white rounded shadow-md">
        <DataTable
          onDelete={(row) => {
            setShowConfirmDelete(true);
            setTopicId(row.original.id);
          }}
          onEdit={(row) => {
            setShowTopic(true);
            setTopicId(row.original.id);
          }}
          loading={isPending || isRefetching || isLoading}
          columns={columns}
          datasource={data?.data}
          enableAction
        />
        <ConfirmDeleteTopic
          show={showConfirmDelete}
          setShow={setShowConfirmDelete}
          handleDelete={async () => []}
          refetch={refetch}
        />
      </div>
    </main>
  );
};

export default Topic;
