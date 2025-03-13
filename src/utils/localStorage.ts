/**
 * Stores a value in the browser's local storage after converting it to a JSON string.
 *
 * @remarks
 * If an error occurs during serialization or storage (for example, if local storage is full), the error will be logged to the console.
 *
 * @param key - The key under which the value is stored.
 * @param value - The value to store, which is serialized as JSON.
 */
export function setItem(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

/**
 * Retrieves a value from the browser's local storage and parses it as JSON.
 *
 * This function attempts to retrieve the item associated with the provided key from local storage.
 * If the item exists, it is parsed from a JSON string into its original form. If no item is found or
 * an error occurs during retrieval or parsing, the function returns undefined. Any errors encountered
 * are logged to the console.
 *
 * @param key - The local storage key to retrieve the value for.
 * @returns The parsed value associated with the key, or undefined if not found or an error occurs.
 */
export function getItem(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
}
