import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { IFilterPayload } from '@/types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface IOption {
  value: number | null;
  label: string;
}

interface IProps {
  selectedValue: number | string | null;
  options: IOption[];
  type: keyof IFilterPayload;
  onChangeFilterPayload: (key: keyof IFilterPayload, val: any) => void;
}
export default function SingleSelect({
  selectedValue,
  options,
  type,
  onChangeFilterPayload,
}: IProps) {
  const [selected, setSelected] = useState<IOption>(options[0]);

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setSelected(selectedOption);
    }
  }, [selectedValue]);

  const handleSelected = (option: IOption) => {
    console.log({ option });
    setSelected(option);
    onChangeFilterPayload(type, option.value);
  };

  return (
    <Listbox value={selected} onChange={handleSelected}>
      {({ open }) => (
        <>
          <div className='relative'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 sm:text-sm sm:leading-6'>
              <span className='block truncate'>{selected.label}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-red-900 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-red-900',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
