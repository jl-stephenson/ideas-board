function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function setItem(key: string, value: unknown) {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn("localStorage is not available");
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getItem(key: string) {
  try {
    if (!isLocalStorageAvailable()) {
        console.warn("localStorage is not available");
        return undefined;
      }
      
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
}
