import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import axios from 'axios';
import './styles.css';

const ITEMS_API_URL = 'https://restcountries.com/v3.1/name';
const DEBOUNCE_DELAY = 500;

interface AutocompleteProps {
  onSelectItem: (item: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelectItem }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const cache = useRef<{ [key: string]: string[] }>({});

  const fetchItems = async (query: string) => {
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
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchItems = useRef(_.debounce(fetchItems, DEBOUNCE_DELAY)).current;

  useEffect(() => {
    if (inputValue) {
      debouncedFetchItems(inputValue);
    } else {
      setResults([]);
    }
  }, [inputValue, debouncedFetchItems]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item: string) => {
    onSelectItem(item);
  };

  return (
    <div className="wrapper">
      <div className={classnames('control', { 'is-loading': loading })}>
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {results.length > 0 && (
        <div className="list is-hoverable">
          {results.map((result, index) => (
            <li
              key={index}
              className="list-item"
              onClick={() => handleItemClick(result)}
            >
              {result}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
