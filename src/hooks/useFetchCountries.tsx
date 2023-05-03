import { useState, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';

const ITEMS_API_URL = 'https://restcountries.com/v3.1/name';
const DEBOUNCE_DELAY = 500;

export const useFetchCountries = () => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const cache = useRef<{ [key: string]: string[] }>({});

  const fetchItems = async (query: string) => {
    setIsError(false)
    if (cache.current[query]) {
      setResults(cache.current[query]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${ITEMS_API_URL}/${query}`);
      const countries = response.data.map((country: { name: { common: string } }) => country.name.common);
      cache.current[query] = countries;
      setResults(countries);
    } catch (error) {
      console.error(error);
      setIsError(true)
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchItems = useRef(_.debounce(fetchItems, DEBOUNCE_DELAY)).current;

  return { results, loading, debouncedFetchItems, setResults, isError };
};
