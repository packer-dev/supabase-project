/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

type CallbackFunction = (...args: any[]) => void;

const listenersMap = new Map<string, Map<string, Set<CallbackFunction>>>();

export default function useEventEmitter(key: string) {
  const listeners = useRef<Map<string, Set<CallbackFunction>>>(new Map());

  if (!listenersMap.has(key)) {
    listenersMap.set(key, listeners.current);
  } else {
    listeners.current = listenersMap.get(key)!;
  }

  const subscribe = (event: string, callback: CallbackFunction) => {
    if (!listeners.current.has(event)) {
      listeners.current.set(event, new Set());
    }
    listeners.current.get(event)?.add(callback);
  };

  const unsubscribe = (event: string, callback: CallbackFunction) => {
    listeners.current.get(event)?.delete(callback);
  };

  const emit = (event: string, ...args: any[]) => {
    listeners.current.get(event)?.forEach((callback) => callback(...args));
  };

  const cleanup = () => {
    // Cleanup: clear all listeners for this key when the component unmounts
    listeners.current.clear();
    listenersMap.delete(key);
  };

  return { subscribe, unsubscribe, emit, cleanup };
}
