export interface DataTableProps {
  loading?: boolean;
  datasource: any;
  columns: any[];
  enableRowSelection?: boolean;
  enableAction?: boolean;
  stripedRows?: boolean;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onCellClick?: (row: any, cell: any) => void;
  cellInsideClick?: boolean;
}
