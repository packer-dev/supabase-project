'use client';

import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

export type AppContextProps = {
  theme: 'dark' | 'light' | 'system';
};

type Action<T extends keyof AppContextProps> = {
  key: T;
  value: AppContextProps[T]; // The type of value is based on the key
};

// Initial state
const init: AppContextProps = {
  theme: 'system',
};

// Reducer function
const AppReducer = <T extends keyof AppContextProps>(
  state: AppContextProps,
  action: Action<T>
) => {
  return { ...state, [action.key]: action.value };
};

// Define context type
type AppContextType = {
  state: AppContextProps;
  dispatch: Dispatch<Action<keyof AppContextProps>>;
};

// Create context with initial empty values
export const AppContext = createContext<AppContextType>({
  state: init,
  dispatch: () => undefined, // Default dispatch function
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, init);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
