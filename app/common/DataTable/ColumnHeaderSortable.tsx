import { Column } from '@tanstack/react-table';
import SortingButton from './SortingButton';

export default function ColumnHeaderSortable({
  label,
  column,
}: {
  label: string;
  column: Column<any>;
}) {
  return (
    <div className="flex gap-1 items-center">
      <span>{label}</span>
      {column.getCanSort() && <SortingButton column={column} />}
    </div>
  );
}
