/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import React from 'react';

type OrderTabProps = {
  tabCurrent: string;
  setTabCurrent: (tab: string) => void;
  result?: {
    [key: string]: number;
  };
};

const OrderTab = ({ tabCurrent, setTabCurrent, result }: OrderTabProps) => {
  const baseTabStyle: ClassValue =
    'inline-block px-4 py-1 rounded hover:bg-gray-200 text-sm';
  const activeStyle: ClassValue = 'bg-gray-200 font-semibold';
  const tabs = ['Pending', 'Canceled', 'Done', 'All'];
  return (
    <div className="w-full py-3">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            variant="secondary"
            onClick={() => setTabCurrent(tab)}
            key={tab}
            className={cn(baseTabStyle, tabCurrent === tab && activeStyle)}
          >
            {tab}{' '}
            {!!result?.[tab.toLowerCase()] &&
              `(${result?.[tab.toLowerCase()]})`}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OrderTab;
