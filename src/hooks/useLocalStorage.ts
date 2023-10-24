import React from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T = {} as T): [T, SetValue<T>] {
  const readValue = React.useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e: any) {
      console.error(`Error reading ${key} from local storage => `, e.message);
      return initialValue;
    }
  }, [initialValue, key]);

  const [item, setItem] = React.useState<T>(readValue);

  React.useEffect(() => {
    setItem(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue: SetValue<T> = React.useCallback((value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setItem(value);
    } catch (e: any) {
      console.error(`Error setting ${key} to local storage => `, e.message);
    }
  }, [key]);

  return [item, setValue];
}

export default useLocalStorage;
