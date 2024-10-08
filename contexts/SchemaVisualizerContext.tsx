"use client";

import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";

export type TableProps = {
  id: string;
  name: string;
  columns: ColumnProps[];
  position?: {
    x: number;
    y: number;
  };
};

export type ColumnProps = {
  id: string;
  value: string;
  type: string;
  mode: "primary" | "foreign" | "normal";
};

export type RelationProps = {
  list: TableProps[];
  column1: string;
  column2: string;
};

export type SchemaVisualizerContextProps = {
  tables: TableProps[];
  data: string;
  relationships: RelationProps[];
  current: TableProps | null;
  showModalForeign: string;
  tableCurrent: TableProps | null;
  showModalTable: boolean;
};

type Action<T extends keyof SchemaVisualizerContextProps> = {
  key: T;
  value: SchemaVisualizerContextProps[T]; // The type of value is based on the key
};

// Initial state
const init: SchemaVisualizerContextProps = {
  tables: [
    {
      id: "0.206695142112302",
      name: "user",
      columns: [
        {
          id: "0.21441415147745357",
          value: "id",
          type: "Integer",
          mode: "primary",
        },
        {
          id: "0.34837708894952524",
          value: "name",
          type: "String",
          mode: "normal",
        },
        {
          id: "0.23580182532587513",
          value: "age",
          type: "String",
          mode: "normal",
        },
      ],
      position: {
        x: 241,
        y: 302,
      },
    },
    {
      id: "0.5239534653839841",
      name: "post",
      columns: [
        {
          id: "0.374428460354828",
          value: "id",
          type: "Integer",
          mode: "primary",
        },
        {
          id: "0.6589503096061804",
          value: "id_user",
          type: "Integer",
          mode: "normal",
        },
        {
          id: "0.27482616441682084",
          value: "content",
          type: "String",
          mode: "normal",
        },
        {
          id: "0.8376206080627757",
          value: "is_deleted",
          type: "Boolean",
          mode: "normal",
        },
      ],
      position: {
        x: 508,
        y: 64,
      },
    },
    {
      id: "0.47389059574818937",
      name: "comment",
      columns: [
        {
          id: "0.940859691307758",
          value: "id",
          type: "Integer",
          mode: "primary",
        },
        {
          id: "0.1370438589209917",
          value: "id_user",
          type: "Integer",
          mode: "normal",
        },
        {
          id: "0.4598807002893641",
          value: "id_post",
          type: "Integer",
          mode: "normal",
        },
      ],
      position: {
        x: 94,
        y: 65,
      },
    },
  ],
  data: "",
  relationships: [],
  current: null,
  showModalForeign: "",
  tableCurrent: null,
  showModalTable: false,
};

// Reducer function
const SchemaVisualizerReducer = <T extends keyof SchemaVisualizerContextProps>(
  state: SchemaVisualizerContextProps,
  action: Action<T>
) => {
  return { ...state, [action.key]: action.value };
};

// Define context type
type SchemaVisualizerContextType = {
  state: SchemaVisualizerContextProps;
  dispatch: Dispatch<Action<keyof SchemaVisualizerContextProps>>;
};

// Create context with initial empty values
export const SchemaVisualizerContext =
  createContext<SchemaVisualizerContextType>({
    state: init,
    dispatch: () => undefined, // Default dispatch function
  });

export const SchemaVisualizerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(SchemaVisualizerReducer, init);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <SchemaVisualizerContext.Provider value={value}>
      {children}
    </SchemaVisualizerContext.Provider>
  );
};
