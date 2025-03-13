import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";

/**
 * A custom React hook that synchronizes state with local storage.
 *
 * This hook initializes state by attempting to read a stored value using the specified key.
 * If no value exists, it falls back to the provided initial value. The state is then kept
 * in sync with local storage by updating the stored value whenever the state changes.
 *
 * @param key - The key used for storing and retrieving the value from local storage.
 * @param initialValue - The initial state value used when no stored value is found.
 * @returns A tuple containing the current state and a function to update the state.
 */
export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const item = getItem(key);
    return (item as T) ?? initialValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
}