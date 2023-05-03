import React, { useState, useEffect, ChangeEvent } from 'react';
import classnames from 'classnames';
import './styles.css';
import { useFetchCountries } from '../../hooks/useFetchCountries';

interface AutocompleteProps {
  onSelectItem: (item: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelectItem }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { results, setResults, loading, debouncedFetchItems, isError } = useFetchCountries();

  useEffect(() => {
    if (inputValue) {
      debouncedFetchItems(inputValue);
    } else {
      setResults([]);
    }
    // eslint-disable-next-line 
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
      {isError ?
        <div className="list is-hoverable">
          <li
            className="list-item"
          >
            Nothing found
          </li>
        </div> : results.length > 0 && (
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
