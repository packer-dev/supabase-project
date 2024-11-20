import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  SchemaVisualizerContext,
  TableProps,
} from '@/contexts/SchemaVisualizerContext';
import React, { useContext, useState } from 'react';

type ModalForeignProps = {
  current: TableProps;
  closeDialog: () => void;
  type?: string;
};

const ModalForeign = ({ current, closeDialog, type }: ModalForeignProps) => {
  const {
    state: { tables, relationships },
    dispatch,
  } = useContext(SchemaVisualizerContext);
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Relationship</DialogTitle>
      </DialogHeader>
      <div className="my-2">
        <div className="flex-row flex items-center gap-2">
          <Combobox
            list={tables
              .filter((item) => item.id !== current.id)
              .map((table) => ({
                value: table.id,
                label: table.name,
              }))}
            value={value}
            setValue={setValue}
          />
          {value && (
            <Combobox
              list={
                tables
                  .find((item) => item.id === value)
                  ?.columns?.filter((column) => column.type === type)
                  .map((column) => ({
                    value: column.value,
                    label: column.value,
                  })) || []
              }
              value={data || 'id'}
              setValue={setData}
            />
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={() => {
            const relationship = tables.find((child) => child.id === value);
            if (relationship)
              dispatch({
                key: 'relationships',
                value: [
                  ...relationships,
                  {
                    list: [current, relationship],
                    column1: `${current.name}.id`,
                    column2: `${value}.${data}`,
                  },
                ],
              });
            closeDialog();
          }}
          type="submit"
        >
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalForeign;
