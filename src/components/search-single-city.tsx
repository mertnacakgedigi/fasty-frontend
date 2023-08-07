import React, { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import { ICity, IFilterPayload, IOriginCity, IOriginRelay } from '@/types';
import { formatCityName } from '@/utils/helper';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  origin: IOriginCity | null;
  handleOriginChange: (origin: IOriginRelay) => void;
}

export default function SearchSingleCity({
  origin,
  handleOriginChange,
}: IProps) {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<IOriginCity | null>(origin);
  const [loading, setLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState<IOriginCity[]>([]);

  const handleSelectCity = async (city: ICity) => {
    setSelectedCity(city);
    const origin: IOriginRelay = {
      name: city.name.toUpperCase(),
      latitude: city.latitude,
      longitude: city.longitude,
      stateCode: city.stateCode,
      uniqueKey: city.latitude + city.name,
      isAnywhere: false,
      isCityLive: false,
      displayValue: city.name + ', ' + city.stateCode,
    };

    handleOriginChange(origin);

    // Clear the query after selection
    setFilteredCities([]);
    setQuery('');
  };

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
  }, 300); // 300 milliseconds debounce

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    fetchCities(value);
  };

  return (
    <Combobox as='div' value={selectedCity} onChange={handleSelectCity}>
      <div className='relative mt-2'>
        <Combobox.Input
          className='w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
          onChange={handleInputChange}
          displayValue={(city: ICity) =>
            formatCityName(city?.name) + ', ' + city?.stateCode
          }
          placeholder={'Search for a city'}
          autoComplete='off'
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Combobox.Button>

        {filteredCities.length > 0 ? (
          <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredCities.map((city) => (
              <Combobox.Option
                key={city.latitude + city.name}
                value={city}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-red-900 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected ? 'font-semibold' : ''
                      )}
                    >
                      {city?.name + ', ' + city?.stateCode}
                    </span>

                    {selected && (
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
      </div>
    </Combobox>
  );
}
