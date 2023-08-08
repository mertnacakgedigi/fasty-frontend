import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import DateTimePicker from '@/components/date-picker';
import SingleSelect from '@/components/single-select';
import MultiSelect from '@/components/multi-select';
import SearchSingleCity from '@/components/search-single-city';
import SearchMultipleCity from '@/components/search-multiple-city';
import {
  IDestinationCity,
  IFilter,
  IFilterPayload,
  IOriginRelay,
} from '@/types';
import {
  classNames,
  hoursToMilliseconds,
  millisecondsToHours,
} from '@/utils/helper';
import api from '@/utils/api';
import Snackbar from '@/components/snackbar';

import _ from 'lodash';

const equipmentOptions = [
  { value: 'FIFTY_THREE_FOOT_TRUCK', label: "53' Trailer" },
  { value: 'FIFTY_THREE_FOOT_CONTAINER', label: "53' Container" },
  { value: 'FIFTY_THREE_FOOT_REEFER_TRUCK', label: "53' Reefer" },
  { value: 'TWENTY_SIX_FOOT_REEFER_TRUCK', label: "26' Reefer" },
  { value: 'FORTY_FIVE_FOOT_CONTAINER', label: "45' Container" },
  { value: 'FORTY_FOOT_CONTAINER', label: "40' Container" },
  { value: 'TWENTY_FOOT_CONTAINER', label: "20' Container" },
  { value: 'FORTY_FIVE_FOOT_HIGHCUBE_CONTAINER', label: "45' HC Container" },
  { value: 'FORTY_FOOT_HIGHCUBE_CONTAINER', label: "40' HC Container" },
  { value: 'TWENTY_SIX_FOOT_BOX_TRUCK', label: "26' Truck" },
  { value: 'CUBE_TRUCK', label: "16' Cube Truck" },
];

const stopOptions = [
  { value: null, label: 'Any' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 999, label: '5+' },
];

const loadTypeOptions = [
  { value: 'LIVE', label: 'Live' },
  { value: 'DROP', label: 'Drop and Hook' },
];

const driverTypeOptions = [
  { value: 'TEAM_DRIVER', label: 'Team' },
  { value: 'SINGLE_DRIVER', label: 'Solo' },
];

const workTypeOptions = [
  { value: 'BLOCK', label: 'Block' },
  { value: 'ONE_WAY', label: 'One Way' },
  { value: 'ROUND_TRIP', label: 'Round Trips' },
];

interface IProps {
  open: boolean;
  onClose: () => void;
  selectedFilter: IFilter;
  onSave: () => void;
  panelType: 'add' | 'edit';
}

export default function Panel({
  open,
  onClose,
  selectedFilter,
  onSave,
  panelType,
}: IProps) {
  const [filter, setFilter] = useState<IFilter>();
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    setFilter(selectedFilter);
  }, [selectedFilter]);

  if (!filter) return null;

  const handleChangeFilter = (key: string, value: any) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
  };
  const handleChangeFilterPayload = async (
    key: keyof IFilterPayload,
    value: any
  ) => {
    if (!key) {
      console.error('key is required');
      return;
    }

    if (key === 'equipmentTypeFiltersForTags') {
      handleEquipmentFilterChange(value);
      return;
    } else if (key == 'endCityRadius') {
      handleEndCityRadiusChange(value);
      return;
    }

    const newFilter = {
      ...filter,
      payload: { ...filter.payload, [key]: value },
    };
    console.log({ newFilter });
    setFilter(newFilter);
  };

  const handleEndCityRadiusChange = (value: number) => {
    const temp = { ...filter };
    if (temp.payload.multiselectDestinationCitiesRadiusFilters) {
      const endCities: IDestinationCity[] = JSON.parse(
        temp.payload.multiselectDestinationCitiesRadiusFilters
      );
      const newEndCities = endCities.map((item) => {
        return { ...item, radius: value };
      });
      filter.payload.multiselectDestinationCitiesRadiusFilters =
        JSON.stringify(newEndCities);
    }

    temp.payload.endCityRadius = value;
    setFilter(temp);
  };

  const handleEquipmentFilterChange = (values: string[]) => {
    const temp = { ...filter };
    temp.payload.equipmentTypeFilters = [...values];

    // if 53' is selected, add other 53' equipment types
    if (values.includes('FIFTY_THREE_FOOT_TRUCK')) {
      [
        'SKIRTED_FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_DRY_VAN',
        'FIFTY_THREE_FOOT_A5_AIR_TRAILER',
        'FORTY_FIVE_FOOT_TRUCK',
      ].forEach((item) => {
        temp.payload.equipmentTypeFilters.push(item);
      });
      // if 53' reefer is selected, add other 53' reefer equipment types
    } else if (values.includes('FIFTY_THREE_FOOT_REEFER_TRUCK')) {
      [
        'FIFTY_THREE_FOOT_AMBIENT_REEFER_TRUCK',
        'FIFTY_THREE_FOOT_FROZEN_TRUCK',
      ].forEach((item) => {
        temp.payload.equipmentTypeFilters.push(item);
      });
    }

    temp.payload.equipmentTypeFiltersForTags = values;
    temp.payload.equipmentTypeFilters = _.uniq(
      temp.payload.equipmentTypeFilters
    );

    setFilter(temp);
  };

  const handleOriginChange = (origin: IOriginRelay) => {
    const temp = { ...filter };
    temp.payload.originCity = origin;
    temp.payload.startCityName = origin.name;
    temp.payload.startCityStateCode = origin.stateCode;
    temp.payload.startCityDisplayValue = origin.name + ', ' + origin.stateCode;
    temp.payload.startCityLongitude = origin.longitude;
    temp.payload.startCityLatitude = origin.latitude;
    setFilter(temp);
  };

  const onHandleSubmit = async () => {
    if (panelType === 'add') {
      const res = await api.post('/filter', filter);
      if (res.status === 201) {
        onClose();
        setSnackbar(true);
        onSave();
      } else {
        alert('Failed');
      }
      return;
    }

    const res = await api.put(`/filter/${filter.id}`, filter);
    if (res.status === 200) {
      onClose();
      setSnackbar(true);
      onSave();
    } else {
      alert('Failed');
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={onClose}>
          <div className='fixed inset-0' />

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-500'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-500'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-2xl'>
                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                      <div className='flex-1'>
                        {/* Header */}
                        <div className='bg-gray-50 px-4 py-6 sm:px-6'>
                          <div className='flex items-start justify-between space-x-3'>
                            <div className='space-y-1'>
                              <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                                {panelType === 'add'
                                  ? 'New Filter'
                                  : filter.name}
                              </Dialog.Title>
                              <p className='text-sm text-gray-500'>
                                Get started by filling in the information below
                                to create or edit your filter.
                              </p>
                            </div>
                            <div className='flex h-7 items-center'>
                              <button
                                type='button'
                                className='relative border-none text-gray-400 hover:text-gray-500'
                                onClick={onClose}
                              >
                                <span className='absolute -inset-2.5' />
                                <span className='sr-only'>Close panel</span>
                                <XMarkIcon
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <form>
                          <div className='p-6 sm:space-y-0 sm:py-0 '>
                            <div className='pb-12'>
                              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 '>
                                <div className='sm:col-span-full'>
                                  <label
                                    htmlFor='filter-name'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Name
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='text'
                                      name='filter-name'
                                      id='filter-name'
                                      value={filter.name}
                                      onChange={(e) =>
                                        handleChangeFilter(
                                          'name',
                                          e.target.value
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-5'>
                                  <label
                                    htmlFor='origin-city'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Origin
                                  </label>
                                  <div className='mt-2'>
                                    <SearchSingleCity
                                      origin={filter.payload.originCity}
                                      handleOriginChange={handleOriginChange}
                                    />
                                  </div>
                                </div>

                                <div className='sm:col-span-1'>
                                  <label
                                    htmlFor='radius'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Radius
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='radius'
                                      id='radius'
                                      value={filter.payload.startCityRadius}
                                      onChange={(e) =>
                                        handleChangeFilterPayload(
                                          'startCityRadius',
                                          parseInt(e.target.value)
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-5'>
                                  <label
                                    htmlFor='origin-city'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Destinations
                                  </label>
                                  <div className='mt-2'>
                                    <SearchMultipleCity
                                      selectedOnes={
                                        filter.payload
                                          .multiselectDestinationCitiesRadiusFilters
                                      }
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      selectedEndCityRadius={
                                        filter.payload.endCityRadius || 25
                                      }
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-1'>
                                  <label
                                    htmlFor='radius'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Radius
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='radius'
                                      id='radius'
                                      value={filter.payload.endCityRadius || ''}
                                      onChange={(e) =>
                                        handleChangeFilterPayload(
                                          'endCityRadius',
                                          parseInt(e.target.value)
                                        )
                                      }
                                      disabled={
                                        filter.payload
                                          .multiselectDestinationCitiesRadiusFilters ===
                                          null ||
                                        filter.payload
                                          .multiselectDestinationCitiesRadiusFilters
                                          .length === 0
                                      }
                                      className='disabled:bg-gray-100 disabled:text-gray-400 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='origin-city'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Start Date & Time
                                  </label>
                                  <div className='mt-2'>
                                    <DateTimePicker
                                      date={filter.payload.startDate}
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      type='start'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='origin-city'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    End Date & Time
                                  </label>
                                  <div className='mt-2'>
                                    <DateTimePicker
                                      date={filter.payload.endDate}
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      type='end'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='payout'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Payout (min)
                                  </label>
                                  <div className='mt-2'>
                                    <div className='relative mt-2 rounded-md shadow-sm'>
                                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                        <span className='text-gray-500 sm:text-sm'>
                                          $
                                        </span>
                                      </div>
                                      <input
                                        type='text'
                                        name='price'
                                        id='price'
                                        value={filter.payload.minPayout || ''}
                                        onChange={(e) =>
                                          handleChangeFilterPayload(
                                            'minPayout',
                                            parseInt(e.target.value)
                                          )
                                        }
                                        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                        placeholder='0.00'
                                        aria-describedby='price-currency'
                                      />
                                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                                        <span
                                          className='text-gray-500 sm:text-sm'
                                          id='price-currency'
                                        >
                                          USD
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='minPricePerDistance'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Price / Mile (min)
                                  </label>
                                  <div className='mt-2'>
                                    <div className='relative mt-2 rounded-md shadow-sm'>
                                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                        <span className='text-gray-500 sm:text-sm'>
                                          $
                                        </span>
                                      </div>
                                      <input
                                        type='text'
                                        name='minPricePerDistance'
                                        id='minPricePerDistance'
                                        value={
                                          filter.payload.minPricePerDistance ||
                                          0
                                        }
                                        onChange={(e) =>
                                          handleChangeFilterPayload(
                                            'minPricePerDistance',
                                            parseInt(e.target.value)
                                          )
                                        }
                                        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                        placeholder='0.00'
                                        aria-describedby='price-currency'
                                      />
                                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                                        <span
                                          className='text-gray-500 sm:text-sm'
                                          id='price-currency'
                                        >
                                          USD
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='pricePerMile'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Stops (max)
                                  </label>
                                  <div className='mt-2'>
                                    <SingleSelect
                                      selectedValue={
                                        filter.payload.maximumNumberOfStops
                                      }
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      type='maximumNumberOfStops'
                                      options={stopOptions}
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='minDistance'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Min Distance (mile)
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='minDistance'
                                      id='minDistance'
                                      value={filter.payload.minDistance || ''}
                                      onChange={(e) =>
                                        handleChangeFilterPayload(
                                          'minDistance',
                                          parseInt(e.target.value)
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='maxDistance'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Max Distance (mile)
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='maxDistance'
                                      id='maxDistance'
                                      value={filter.payload.maxDistance || ''}
                                      onChange={(e) =>
                                        handleChangeFilterPayload(
                                          'maxDistance',
                                          parseInt(e.target.value)
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='minimumDurationInMillis'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Min Duration (hours)
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='minimumDurationInMillis'
                                      id='minimumDurationInMillis'
                                      value={
                                        filter.payload.minimumDurationInMillis
                                          ? millisecondsToHours(
                                              filter.payload
                                                .minimumDurationInMillis
                                            )
                                          : ''
                                      }
                                      onChange={(e) =>
                                        handleChangeFilterPayload(
                                          'minimumDurationInMillis',
                                          hoursToMilliseconds(
                                            parseInt(e.target.value)
                                          )
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='maximumDurationInMillis'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Max Duration (hours)
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='maximumDurationInMillis'
                                      id='maximumDurationInMillis'
                                      value={
                                        filter.payload.maximumDurationInMillis
                                          ? millisecondsToHours(
                                              filter.payload
                                                .maximumDurationInMillis
                                            )
                                          : ''
                                      }
                                      onChange={(e) =>
                                        handleChangeFilterPayload(
                                          'maximumDurationInMillis',
                                          hoursToMilliseconds(
                                            parseInt(e.target.value)
                                          )
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='trailerStatus'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Trailer Status
                                  </label>
                                  <div className='mt-2'>
                                    <MultiSelect
                                      selectedValues={
                                        filter.payload.trailerStatusFilters
                                      }
                                      type='trailerStatusFilters'
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      options={[
                                        {
                                          value: 'PROVIDED',
                                          label: 'Provided',
                                        },
                                        {
                                          value: 'REQUIRED',
                                          label: 'Required',
                                        },
                                      ]}
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-3'>
                                  <label
                                    htmlFor='equipment'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Equipment
                                  </label>
                                  <div className='mt-2'>
                                    <MultiSelect
                                      selectedValues={
                                        filter.payload
                                          .equipmentTypeFiltersForTags
                                      }
                                      type='equipmentTypeFiltersForTags'
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      options={equipmentOptions}
                                    />
                                  </div>
                                </div>

                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='workType'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Work Type
                                  </label>
                                  <div className='mt-2'>
                                    <MultiSelect
                                      selectedValues={
                                        filter.payload.workOpportunityTypeList
                                      }
                                      type='workOpportunityTypeList'
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      options={workTypeOptions}
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='driverType'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Driver Type
                                  </label>
                                  <div className='mt-2'>
                                    <MultiSelect
                                      selectedValues={
                                        filter.payload.driverTypeFilters
                                      }
                                      type='driverTypeFilters'
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      options={driverTypeOptions}
                                    />
                                  </div>
                                </div>

                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='loadType'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Load Type
                                  </label>
                                  <div className='mt-2'>
                                    <MultiSelect
                                      selectedValues={
                                        filter.payload.loadingTypeFilters
                                      }
                                      type='loadingTypeFilters'
                                      onChangeFilterPayload={
                                        handleChangeFilterPayload
                                      }
                                      options={loadTypeOptions}
                                    />
                                  </div>
                                </div>
                                <p className='col-span-full block text-lg font-bold text-gray-900'>
                                  Fasty Advance Settings
                                </p>
                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='currentBookCount'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Current Book Count
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='currentBookCount'
                                      id='currentBookCount'
                                      value={filter.currentBookCount}
                                      onChange={(e) =>
                                        handleChangeFilter(
                                          'currentBookCount',
                                          parseInt(e.target.value)
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='currentBookCount'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Book Limit Count
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      type='number'
                                      name='bookLimit'
                                      id='bookLimit'
                                      value={filter.bookLimit}
                                      onChange={(e) =>
                                        handleChangeFilter(
                                          'bookLimit',
                                          parseInt(e.target.value)
                                        )
                                      }
                                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                                    />
                                  </div>
                                </div>
                                <div className='sm:col-span-2'>
                                  <label
                                    htmlFor='testMode'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                  >
                                    Test Mode
                                  </label>
                                  <div className='mt-2'>
                                    <Switch
                                      checked={filter.isTestMode}
                                      onChange={() =>
                                        handleChangeFilter(
                                          'isTestMode',
                                          !filter.isTestMode
                                        )
                                      }
                                      className={classNames(
                                        filter.isTestMode
                                          ? 'bg-red-900'
                                          : 'bg-gray-200',
                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2'
                                      )}
                                    >
                                      <span className='sr-only'>
                                        Use setting
                                      </span>
                                      <span
                                        className={classNames(
                                          filter.isTestMode
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                        )}
                                      >
                                        <span
                                          className={classNames(
                                            filter.isTestMode
                                              ? 'opacity-0 duration-100 ease-out'
                                              : 'opacity-100 duration-200 ease-in',
                                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                          )}
                                          aria-hidden='true'
                                        >
                                          <svg
                                            className='h-3 w-3 text-gray-400'
                                            fill='none'
                                            viewBox='0 0 12 12'
                                          >
                                            <path
                                              d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                                              stroke='currentColor'
                                              strokeWidth={2}
                                              strokeLinecap='round'
                                              strokeLinejoin='round'
                                            />
                                          </svg>
                                        </span>
                                        <span
                                          className={classNames(
                                            filter.isTestMode
                                              ? 'opacity-100 duration-200 ease-in'
                                              : 'opacity-0 duration-100 ease-out',
                                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                          )}
                                          aria-hidden='true'
                                        >
                                          <svg
                                            className='h-3 w-3 text-red-900'
                                            fill='currentColor'
                                            viewBox='0 0 12 12'
                                          >
                                            <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                                          </svg>
                                        </span>
                                      </span>
                                    </Switch>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                      {/* Action buttons */}
                      <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                        <div className='flex justify-end space-x-3'>
                          <button
                            type='button'
                            className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                            onClick={onClose}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={onHandleSubmit}
                            // type="submit"
                            className='inline-flex justify-center rounded-md bg-red-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900'
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Snackbar show={snackbar} setShow={setSnackbar} />
    </>
  );
}
