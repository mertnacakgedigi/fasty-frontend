'use client';
import { useEffect, useState } from 'react';
import Panel from '@/components/panel';
import { convertToLosAngeles } from '@/utils/helper';
import { PencilIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import { FilterStatus, IFilter } from '@/types';
import api from '@/utils/api';
import Snackbar from '@/components/snackbar';
import { useRouter } from 'next/navigation';

const initialFilter: IFilter = {
  name: '',
  status: FilterStatus.PAUSED,
  bookLimit: 1,
  currentBookCount: 0,
  lastBookedAt: null,
  bookLimitInterval: 0,
  blockStartTime: null,
  blockEndTime: null,
  isTestMode: true,
  payload: {
    workOpportunityTypeList: ['ONE_WAY'],
    originCity: null,
    startCityName: null,
    startCityStateCode: null,
    startCityLatitude: null,
    startCityLongitude: null,
    startCityDisplayValue: null,
    isOriginCityLive: false,
    startCityRadius: 50,
    destinationCity: null,
    multiselectDestinationCitiesRadiusFilters: null,
    exclusionCitiesFilter: null,
    endCityName: null,
    endCityStateCode: null,
    endCityDisplayValue: null,
    endCityLatitude: null,
    endCityLongitude: null,
    isDestinationCityLive: null,
    endCityRadius: null,
    startDate: null,
    endDate: null,
    minDistance: null,
    maxDistance: null,
    minimumDurationInMillis: null,
    maximumDurationInMillis: null,
    minPayout: null,
    minPricePerDistance: null,
    trailerStatusFilters: ['PROVIDED'],
    equipmentTypeFilters: [
      'FIFTY_THREE_FOOT_TRUCK',
      'SKIRTED_FIFTY_THREE_FOOT_TRUCK',
      'FIFTY_THREE_FOOT_DRY_VAN',
      'FIFTY_THREE_FOOT_A5_AIR_TRAILER',
      'FORTY_FIVE_FOOT_TRUCK',
    ],
    equipmentTypeFiltersForTags: ['FIFTY_THREE_FOOT_TRUCK'],
    driverTypeFilters: [],
    uiiaCertificationsFilter: [],
    workOpportunityOperatingRegionFilter: [],
    loadingTypeFilters: [],
    maximumNumberOfStops: null,
    workOpportunityAccessType: null,
    sortByField: 'startTime',
    sortOrder: 'asc',
    visibilityStatusType: 'ALL',
    nextItemToken: 0,
    resultSize: 50,
    searchURL: '',
    isAutoRefreshCall: false,
    notificationId: '',
    auditContextMap:
      '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
  },
};

export default function Example() {
  const [open, setOpen] = useState(false);
  const [panelType, setPanelType] = useState<'add' | 'edit'>('add');
  const [selectedFilter, setSelectedFilter] = useState<IFilter>(initialFilter);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [snackbar, setSnackbar] = useState(false);

  const router = useRouter();
  const handleOpenEditPanel = (filter: IFilter) => {
    setPanelType('edit');
    setSelectedFilter(filter);
    setOpen(true);
  };

  const handleOpenAddPanel = () => {
    setPanelType('add');
    setOpen(true);
  };

  const handleClosePanel = () => {
    setOpen(false);
    setSelectedFilter(initialFilter);
  };

  const fetchFilters = async () => {
    const response = await api.get('/filter');
    if (response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
      return;
    }
    setFilters(response.data);
  };

  const startFilter = async (filter: IFilter) => {
    const res = await api.put(`/filter/${filter.id}`, {
      status: FilterStatus.ACTIVE,
    });
    if (res.status === 200) {
      setSnackbar(true);
      await fetchFilters();
    } else {
      alert('Something went wrong');
    }
  };

  const stopFilter = async (filter: IFilter) => {
    const res = await api.put(`/filter/${filter.id}`, {
      status: FilterStatus.PAUSED,
    });
    if (res.status === 200) {
      setSnackbar(true);
      await fetchFilters();
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-lg font-semibold leading-6 text-gray-900'>
            Filters
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            Manage your filters to book loads faster
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            onClick={handleOpenAddPanel}
            className='block rounded-md bg-red-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-grey-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900'
          >
            Add filter
          </button>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Origin -{'>'} Destination
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Start Date / End Date
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Min Payment
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Status
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {filters.map((filter) => (
                  <tr key={filter.id}>
                    <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0'>
                      <div className='flex items-center'>
                        {/*<div className="h-11 w-11 flex-shrink-0">*/}
                        {/*  <img className="h-11 w-11 rounded-full" src={person.image} alt="" />*/}
                        {/*</div>*/}
                        <div>
                          <div className='font-medium text-gray-900'>
                            {filter.name}
                          </div>
                          {/*<div className="mt-1 text-gray-500">{filter.email}</div>*/}
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='text-gray-900'>
                        {filter.payload.startCityDisplayValue} -{'>'}{' '}
                        {filter.payload
                          .multiselectDestinationCitiesRadiusFilters
                          ? JSON.parse(
                              filter.payload
                                .multiselectDestinationCitiesRadiusFilters
                            ).map((des: any) => des.cityDisplayValue)
                          : 'Anywhere'}
                      </div>
                      {/*<div className="mt-1 text-gray-500">{filter.payload.multiselectDestinationCitiesRadiusFilters && JSON.parse(filter.payload.multiselectDestinationCitiesRadiusFilters).map(des => des.cityDisplayValue)}</div>*/}
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='text-gray-900'>
                        {`${convertToLosAngeles(
                          filter.payload.startDate,
                          true
                        )}`}
                      </div>
                      <div className='mt-1 text-gray-500'>
                        {`${convertToLosAngeles(filter.payload.endDate, true)}`}
                      </div>
                      {/*<div className="mt-1 text-gray-500">{filter.payload.multiselectDestinationCitiesRadiusFilters && JSON.parse(filter.payload.multiselectDestinationCitiesRadiusFilters).map(des => des.cityDisplayValue)}</div>*/}
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='font-medium text-gray-900'>
                        ${filter.payload.minPayout}
                      </div>
                      <div className='mt-1 text-gray-500'>
                        {' '}
                        {filter.payload.minPricePerDistance &&
                          `${filter.payload.minPricePerDistance} / mi`}
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      {filter.status === FilterStatus.ACTIVE ? (
                        <div className='inline-flex items-center gap-x-1.5 rounded-full bg-green-100 py-1 px-2 text-xs font-medium text-green-700'>
                          <svg
                            className='h-1.5 w-1.5 fill-green-500'
                            viewBox='0 0 6 6'
                            aria-hidden='true'
                          >
                            <circle cx='3' cy='3' r='3' />
                          </svg>
                          Active
                        </div>
                      ) : (
                        <div className='inline-flex items-center gap-x-1.5 rounded-full bg-red-100 py-1 px-2 text-xs font-medium text-red-700'>
                          <svg
                            className='h-1.5 w-1.5 fill-red-500'
                            viewBox='0 0 6 6'
                            aria-hidden='true'
                          >
                            <circle cx='3' cy='3' r='3' />
                          </svg>
                          Paused
                        </div>
                      )}

                      {filter.isTestMode ? (
                        <div className='ml-1 inline-flex rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-gray-200'>
                          Test Mode
                        </div>
                      ) : (
                        <div className='ml-1 inline-flex rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 text-red-900 ring-red-900'>
                          🚀 Book Mode
                        </div>
                      )}
                    </td>

                    <td className='relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                      <div className='flex flex-row'>
                        {' '}
                        {filter.status === FilterStatus.ACTIVE ? (
                          <PauseIcon
                            className='h-6 w-6 text-red-900 group-hover:text-gray-900 cursor-pointer'
                            aria-hidden='true'
                            onClick={() => stopFilter(filter)}
                          />
                        ) : (
                          <PlayIcon
                            className='h-6 w-6 text-red-900 group-hover:text-gray-900 cursor-pointer'
                            aria-hidden='true'
                            onClick={() => startFilter(filter)}
                          />
                        )}
                        <PencilIcon
                          onClick={() => handleOpenEditPanel(filter)}
                          className='h-6 w-5 ml-5 text-red-900 group-hover:text-gray-900 cursor-pointer'
                          aria-hidden='true'
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedFilter && (
        <Panel
          open={open}
          onClose={handleClosePanel}
          selectedFilter={selectedFilter}
          onSave={fetchFilters}
          panelType={panelType}
        />
      )}
      <Snackbar show={snackbar} setShow={setSnackbar} />
    </div>
  );
}
