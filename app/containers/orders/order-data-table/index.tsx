/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { columns, ORDER_DATA_TABLE_QUERY_KEY } from './constants';
import { DataTable } from '@/app/common/DataTable';
import OrderTab from '../order-tab';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { useApi } from '@/services/api';
import ConfirmActionOrder from './ConfirmActionOrder';
import useEventEmitter from '@/app/hooks/use-event-emitter';
import { saveAs } from 'file-saver';

export default function OrderDataTable() {
  const [tabCurrent, setTabCurrent] = useState('Pending');
  const { order } = useApi();
  const [showConfirmAction, setShowConfirmAction] = useState<
    '' | 'done' | 'canceled' | 'pending'
  >('');
  const orderIdRef = useRef<string | null>(null);
  const {
    isPending,
    isRefetching,
    data: { data, result } = {},
    refetch,
  } = useQuery({
    queryKey: [ORDER_DATA_TABLE_QUERY_KEY],
    queryFn: () => order.search('', tabCurrent.toLowerCase()),
    enabled: true,
  });
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabCurrent]);
  const courseEventEmitter = useEventEmitter(ORDER_DATA_TABLE_QUERY_KEY);

  useEffect(() => {
    courseEventEmitter.subscribe('refresh', refetch);
    // Cleanup
    return () => {
      courseEventEmitter.unsubscribe('refresh', refetch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex justify-between items-center py-3'>
        <OrderTab
          result={result}
          tabCurrent={tabCurrent}
          setTabCurrent={(tab) => setTabCurrent(tab)}
        />
        <Button type='button' onClick={async () => {
          const data = await order.exportData('', tabCurrent);
          const formatData = data.map(item => ({
            "Order ID": item.id,
            "Customer": `${item?.users?.email ?? 'xxx@gmail.com'} ${item?.users?.phone ?? "03*****989"}`,
            "Customer type": "Phu Huynh",
            "Course": item?.courses?.name,
            "Order price": item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replace("VND", "VNĐ"),
            "Status": item.status,
            "Last update": item.updated_at
          }))
          const headers = ["Order ID", "Customer", "Customer type", "Course", "Order price", "Status", "Last update"].join(",")
          const rows = formatData.map(obj => Object.values(obj).join(","))
          const blob = new Blob([[headers, ...rows].join("\n")], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'countries.csv');
        }}>
          <DownloadIcon size={16} />
          <span className='ml-2'>Export</span>
        </Button>
      </div >
      <div className='flex justify-between'>
        <div className='w-1/2'>
          <Input
            className='h-8 w-1/2 bg-white'
            placeholder='Enter name to find...'
          />
        </div>
        <div className='flex w-1/2 justify-end'></div>
      </div>
      <div className='p-4 bg-white rounded shadow-md'>
        <DataTable
          loading={isPending || isRefetching}
          columns={
            tabCurrent === 'Canceled' || tabCurrent === 'Done'
              ? columns.filter((item) => item.header !== 'Action')
              : columns
          }
          datasource={data}
          onCellClick={(row, cell) => {
            if (cell.column.id === 'action') {
              console.log(cell.payload);
              setShowConfirmAction(cell.payload);
              orderIdRef.current = row.original.id;
            }
          }}
          cellInsideClick
        />
      </div>
      {showConfirmAction}
      {
        showConfirmAction && (
          <ConfirmActionOrder
            action={showConfirmAction as any}
            orderId={orderIdRef.current ?? ''}
            onClose={() => {
              orderIdRef.current = null;
              setShowConfirmAction('');
            }}
            show={!!showConfirmAction}
          />
        )
      }
    </>
  );
}
