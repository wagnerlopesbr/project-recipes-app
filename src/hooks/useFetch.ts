import React from 'react';

type Cache<T> = { [url: string]: T | undefined };

const cache: Cache<any> = {};

export const getFromCache = <T>(url: string): T | undefined => {
  return cache[url];
};

export const addToCache = <T>(url: string, data: T): void => {
  cache[url] = data;
};

function useFetch<T = any>(url: string) {
  const [fetchData, setFetchData] = React.useState({
    data: <T | null>(null),
    isLoading: false,
    error: '',
  });

  const fetchApi = React.useCallback(async () => {
    const cachedData = getFromCache<T>(url);
    if (cachedData) {
      setFetchData((state) => ({ ...state, data: cachedData }));
      console.log('aquiii');
      return;
    }

    setFetchData((state) => ({ ...state, isLoading: true }));
    try {
      const response = await fetch(url);
      const data = await response.json() as T;
      setFetchData((state) => ({ ...state, data }));
      addToCache(url, data);
    } catch (error: any) {
      setFetchData((state) => ({ ...state, error }));
    } finally {
      setFetchData((state) => ({ ...state, isLoading: false }));
    }
  }, [url]);

  React.useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return { ...fetchData, refetch: fetchApi };
}

export default useFetch;
