import React, { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import { ICity } from '@/types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SearchMultipleCity() {
  const [query, setQuery] = useState('');
  const [selectedCities, setSelectedCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState<ICity[]>([]);

  const fetchCities = _.debounce(async (value: string) => {
    if (value === '') {
      setFilteredCities([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const response = await fetch(
      `http://localhost:3002/city/search?name=${value}`
    );
    const data = await response.json();
    setFilteredCities(data);
    setLoading(false);
  }, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    fetchCities(value);
  };

  const handleSelectCity = (city: ICity) => {
    // Check if the city is already selected

    if (isCitySelected(city)) {
      // If city is already selected, then remove it from the list
      setSelectedCities((prevCities) =>
        prevCities.filter((selectedCity) => selectedCity.id !== city.id)
      );
    } else {
      // Otherwise, add the city to the list
      setSelectedCities((prevCities) => [...prevCities, city]);
    }
    // Clear the query after selection
    setFilteredCities([]);
    setQuery('');
  };

  const handleRemoveCity = (id: number) => {
    setSelectedCities(selectedCities.filter((city) => city.id !== id));
  };

  const isCitySelected = (city: ICity): boolean => {
    return selectedCities.some((selectedCity) => selectedCity.id === city.id);
  };

  return (
    <div>
      <Combobox as='div' onChange={handleSelectCity}>
        <div className='relative mt-2 flex ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 flex-wrap items-center bg-white rounded-md shadow-sm text-sm'>
          {selectedCities.map((city) => (
            <span
              key={city.id}
              className='inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2 m-1'
            >
              {city.name}, {city.stateCode}
              <button
                onClick={() => handleRemoveCity(city.id)}
                className='ml-2 text-red-900'
              >
                x
              </button>
            </span>
          ))}
          <Combobox.Input
            value={query}
            className='flex-1 min-w-2 px-2 py-1.5 ring-1 focus:ring-2 ring-inset ring-gray-300 border-none sm:text-sm sm:leading-6 rounded focus:ring-red-900 '
            onChange={handleInputChange}
            autoComplete='off'
            placeholder='Search cities...'
          />
        </div>

        {filteredCities.length > 0 ? (
          <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredCities.map((city) => (
              <Combobox.Option
                key={city.id}
                value={city}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-red-900 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active }) => (
                  <>
                    <span className={classNames('block truncate')}>
                      {city?.name + ', ' + city?.stateCode}
                    </span>
                    {isCitySelected(city) && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-red-900'
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : null}
      </Combobox>
    </div>
  );
}
