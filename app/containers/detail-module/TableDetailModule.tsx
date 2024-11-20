'use client';

import { DataTable } from '@/components/shared/DataTable';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { useApi } from '@/services/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { columns } from './constants';
import CreateLesson from '../create-lesson';

const TableDetailModule = () => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const [showCreateModule, setShowCreateModule] = useState(false);
  const { module } = useApi();
  const fetchModules = async () => {
    return module.search(value);
  };
  const { data, isLoading, isPending, isRefetching, refetch } = useQuery({
    queryKey: ['modules', value],
    queryFn: fetchModules,
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
        <CreateLesson
          refetch={refetch}
          id={null}
          open={showCreateModule}
          onOpenChange={(open) => {
            setShowCreateModule(open);
          }}
        />
      </div>
      <div className="p-4 bg-white rounded shadow-md">
        <DataTable
          onCellClick={(row, cell) => {
            if (cell.column.id === 'name') {
              router.push(
                `/courses/${row.original.name
                  .toLowerCase()
                  .replaceAll(' ', '-')}`
              );
            }
          }}
          onEdit={(row) => {
            setShowCreateModule(true);
          }}
          loading={isPending || isRefetching || isLoading}
          columns={columns}
          datasource={data?.data}
          enableAction
        />
      </div>
    </main>
  );
};

export default TableDetailModule;
