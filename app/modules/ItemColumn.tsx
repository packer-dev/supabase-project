import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  ColumnProps,
  SchemaVisualizerContext,
  TableProps,
} from '@/contexts/SchemaVisualizerContext';
import React, { useContext } from 'react';

type ItemColumnProps = {
  column: ColumnProps;
  item: TableProps;
};

const ItemColumn = ({ column, item }: ItemColumnProps) => {
  const {
    state: { tables },
    dispatch,
  } = useContext(SchemaVisualizerContext);
  const colorMode = column.mode === 'foreign' ? 'bg-blue-500' : 'bg-gray-500';
  const updateColumStatus = (
    item: TableProps,
    column: ColumnProps,
    mode: 'primary' | 'foreign' | 'normal'
  ) => {
    dispatch({
      key: 'tables',
      value: [...tables].map((table) => {
        if (table.id === item.id) {
          return {
            ...table,
            columns: [...table.columns].map((child) => {
              if (child.id === column.id)
                return {
                  ...child,
                  mode,
                };
              return {
                ...child,
                mode: child.mode !== mode ? child.mode : 'normal',
              };
            }),
          };
        }
        return table;
      }),
    });
  };
  return (
    <ContextMenu key={column.id} modal={false}>
      <ContextMenuTrigger draggable>
        <div className="flex-row flex gap-2">
          <div className="flex gap-2 items-center flex-1">
            <span
              className={`flex w-2 h-2 rounded-full ${
                column.mode === 'primary' ? 'bg-yellow-500' : colorMode
              }`}
            />
            <span className="font-bold text-gray-600 dark:text-gray-300">
              {column.value}
            </span>
            <span>:</span>
            <span className="text-sm">{column.type}</span>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {column.mode !== 'primary' && (
          <ContextMenuItem
            onClick={() => updateColumStatus(item, column, 'primary')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="bx bx-key text-xl text-yellow-500" />
            <span>Primary key</span>
          </ContextMenuItem>
        )}
        {column.mode !== 'foreign' && (
          <ContextMenuItem
            onClick={() =>
              dispatch({ key: 'showModalForeign', value: item.id })
            }
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="bx bx-key primary text-xl text-black" />
            <span>Foreign Key</span>
          </ContextMenuItem>
        )}
        <ContextMenuItem
          onClick={() => {
            dispatch({
              key: 'tables',
              value: [...tables].map((table) => {
                if (table.id === item.id) {
                  return {
                    ...table,
                    columns: [...table.columns].map((child) =>
                      child.id === column.id
                        ? {
                            ...child,
                            mode: 'normal',
                          }
                        : child
                    ),
                  };
                }
                return table;
              }),
            });
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="bx bx-x text-xl text-red-500" />
          <span>Remove</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ItemColumn;
