'use client';

import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

export type StorageContextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  medias: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected: any[];
  showModal: string;
  path: string;
  refresh: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renameCurrent: any;
  copy: {
    path: string;
    name: string;
    mode: 'file' | 'folder' | '';
  }[];
};

type Action<T extends keyof StorageContextProps> = {
  key: T;
  value: StorageContextProps[T]; // The type of value is based on the key
};

// Initial state
const init: StorageContextProps = {
  medias: [],
  selected: [],
  showModal: '',
  path: '',
  refresh: 0,
  renameCurrent: null,
  copy: [],
};

// Reducer function
const StorageReducer = <T extends keyof StorageContextProps>(
  state: StorageContextProps,
  action: Action<T>
) => {
  return { ...state, [action.key]: action.value };
};

// Define context type
type StorageContextType = {
  state: StorageContextProps;
  dispatch: Dispatch<Action<keyof StorageContextProps>>;
};

// Create context with initial empty values
export const StorageContext = createContext<StorageContextType>({
  state: init,
  dispatch: () => undefined, // Default dispatch function
});

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(StorageReducer, init);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
