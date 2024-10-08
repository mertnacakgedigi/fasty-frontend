import {
  FilterStatus,
  ICity,
  IDestinationCity,
  IFilter,
  IOriginCity,
  IOriginRelay,
} from '@/types';
import moment from 'moment-timezone';

const losAngelesTimezone = 'America/Los_Angeles';

export function convertToLosAngeles(utcString: string | null, isInfo = false) {
  if (!utcString) {
    return 'Anytime';
  }
  // Create a moment object from the UTC timestamp string in UTC timezone
  const utcMoment = moment.utc(utcString);

  // Convert the moment object to the Los Angeles timezone
  const losAngelesMoment = utcMoment.tz(losAngelesTimezone);

  // let formatType = 'MM/DD/YYYY HH:mm'
  if (isInfo) {
    return losAngelesMoment.format('llll');
  }

  // Format the Los Angeles moment object as a date string in the "MM/DD/YYYY HH:mm" format
  // Return the Los Angeles string
  return losAngelesMoment.format('MM/DD/YYYY HH:mm');
}

export function formatCityName(cityName: string) {
  if (!cityName) return '';

  return cityName
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function stringToDate(dateString: string) {
  const dateUTC = moment(dateString);

  // Convert to Los Angeles (LA) time
  const dateLA = dateUTC.tz(losAngelesTimezone);

  // Convert the moment object to a native JavaScript Date object
  return dateLA.toDate();
}

export function dateToString(date: Date) {
  const dateLA = moment.tz(date, 'America/Los_Angeles');

  // Change the timezone to UTC
  const dateUTC = dateLA.utc();

  // Format the moment object to the desired string format
  return dateUTC.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
}

const formatCityDisplayValue = (name: string, stateCode: string) => {
  return `${name.toUpperCase()}, ${stateCode.toUpperCase()}`;
};

export function generateCityKey(lat: number, name: string) {
  return `${lat}${name}`;
}

export function castCityToDestination(
  city: ICity,
  radius: number
): IDestinationCity {
  return {
    cityName: city.name.toUpperCase(),
    cityStateCode: city.stateCode.toUpperCase(),
    cityLatitude: city.latitude,
    cityLongitude: city.longitude,
    cityDisplayValue: formatCityDisplayValue(city.name, city.stateCode),
    radius: radius,
  };
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function castDestinationToCity(city: IDestinationCity): IOriginRelay {
  return {
    name: city.cityName,
    stateCode: city.cityStateCode,
    latitude: city.cityLatitude,
    longitude: city.cityLongitude,
    uniqueKey: generateCityKey(city.cityLatitude, city.cityName),
    displayValue: formatCityDisplayValue(city.cityName, city.cityStateCode),
    isAnywhere: false,
    isCityLive: false,
  };
}

export function millisecondsToHours(milliseconds: number) {
  return milliseconds / 1000 / 60 / 60;
}

export function hoursToMilliseconds(hours: number) {
  return hours * 1000 * 60 * 60;
}
export const dummyFilters: IFilter[] = [
  {
    id: 2,
    name: 'BSNF Short',
    status: FilterStatus.ACTIVE,
    payload: {
      endDate: null,
      minPayout: 200,
      searchURL: '',
      sortOrder: 'asc',
      startDate: '2023-07-20T09:00:00.000Z',
      originCity: {
        name: 'Fontana',
        latitude: 34.04887,
        longitude: -117.44734,
        stateCode: 'CA',
        uniqueKey: '34.04887Fontana, CA',
        isAnywhere: false,
        isCityLive: false,
        displayValue: 'Fontana, CA',
      },
      resultSize: 100,
      endCityName: null,
      maxDistance: 35,
      minDistance: null,
      sortByField: 'startTime',
      endCityRadius: null,
      nextItemToken: 0,
      savedSearchId: 'a91b9906-cce6-4f00-b81a-c21fdc380e12',
      startCityName: 'Fontana',
      notificationId: '',
      auditContextMap:
        '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
      destinationCity: null,
      endCityLatitude: null,
      startCityRadius: 25,
      endCityLongitude: null,
      endCityStateCode: null,
      isOriginCityLive: false,
      driverTypeFilters: [],
      isAutoRefreshCall: true,
      startCityLatitude: 34.04887,
      loadingTypeFilters: ['DROP'],
      startCityLongitude: -117.44734,
      startCityStateCode: 'CA',
      endCityDisplayValue: null,
      minPricePerDistance: null,
      equipmentTypeFilters: ['FIFTY_THREE_FOOT_CONTAINER'],
      maximumNumberOfStops: 2,
      trailerStatusFilters: ['PROVIDED'],
      visibilityStatusType: 'ALL',
      exclusionCitiesFilter: null,
      isDestinationCityLive: null,
      startCityDisplayValue: 'Fontana, CA',
      maximumDurationInMillis: null,
      minimumDurationInMillis: null,
      workOpportunityTypeList: ['ONE_WAY'],
      uiiaCertificationsFilter: null,
      workOpportunityAccessType: null,
      equipmentTypeFiltersForTags: ['FIFTY_THREE_FOOT_CONTAINER'],
      workOpportunityOperatingRegionFilter: [],
      multiselectDestinationCitiesRadiusFilters: null,
    },
    userId: '9ebc0361-01d4-4787-a1d7-64567168bbce',
    bookLimit: 30,
    bookLimitInterval: 48,
    blockStartTime: '2023-07-23T14:00:00.000Z',
    blockEndTime: '2023-07-24T14:00:00.000Z',
    currentBookCount: 0,
    lastBookedAt: '2023-08-03T05:00:00Z',
    createdAt: '2023-04-23T22:15:22.916Z',
    updatedAt: '2023-08-02T01:50:34.899Z',
    isTestMode: true,
  },
  {
    id: 10,
    name: 'San Diego ➡️ Fontana',
    status: FilterStatus.PAUSED,
    payload: {
      endDate: null,
      minPayout: 385,
      searchURL: '',
      sortOrder: 'asc',
      startDate: null,
      originCity: {
        name: 'SAN DIEGO',
        latitude: 32.814977,
        longitude: -117.135562,
        stateCode: 'CA',
        uniqueKey: '32.814977SAN DIEGO, CA',
        isAnywhere: false,
        isCityLive: false,
        displayValue: 'SAN DIEGO, CA',
      },
      resultSize: 50,
      endCityName: null,
      maxDistance: 150,
      minDistance: null,
      sortByField: 'startTime',
      endCityRadius: 25,
      nextItemToken: 0,
      savedSearchId: '4f6f8365-9dc9-45e3-b62b-a3e31996d11f',
      startCityName: 'SAN DIEGO',
      notificationId: '',
      auditContextMap:
        '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
      destinationCity: null,
      endCityLatitude: null,
      startCityRadius: 25,
      endCityLongitude: null,
      endCityStateCode: null,
      isOriginCityLive: false,
      driverTypeFilters: [],
      isAutoRefreshCall: true,
      startCityLatitude: 32.814977,
      loadingTypeFilters: ['DROP'],
      startCityLongitude: -117.135562,
      startCityStateCode: 'CA',
      endCityDisplayValue: null,
      minPricePerDistance: null,
      equipmentTypeFilters: ['FIFTY_THREE_FOOT_CONTAINER'],
      maximumNumberOfStops: 3,
      trailerStatusFilters: ['PROVIDED'],
      visibilityStatusType: 'ALL',
      exclusionCitiesFilter: null,
      isDestinationCityLive: null,
      startCityDisplayValue: 'SAN DIEGO, CA',
      maximumDurationInMillis: null,
      minimumDurationInMillis: null,
      workOpportunityTypeList: ['ONE_WAY', 'ROUND_TRIP'],
      uiiaCertificationsFilter: [],
      workOpportunityAccessType: null,
      equipmentTypeFiltersForTags: ['FIFTY_THREE_FOOT_CONTAINER'],
      workOpportunityOperatingRegionFilter: [],
      multiselectDestinationCitiesRadiusFilters:
        '[{"cityLatitude":34.097421,"cityLongitude":-117.45924,"cityName":"FONTANA","cityStateCode":"CA","cityDisplayValue":"FONTANA, CA","radius":25}]',
    },
    userId: '9ebc0361-01d4-4787-a1d7-64567168bbce',
    bookLimit: 1,
    bookLimitInterval: 24,
    blockStartTime: '2023-07-23T14:00:00.000Z',
    blockEndTime: '2023-07-24T07:00:00.000Z',
    currentBookCount: 0,
    lastBookedAt: '2023-07-23T10:45:00Z',
    createdAt: '2023-07-25T01:49:00.083Z',
    updatedAt: '2023-07-25T01:49:00.083Z',
    isTestMode: true,
  },
  {
    id: 11,
    name: 'Oxnard ➡️ Fontana',
    status: FilterStatus.PAUSED,
    payload: {
      endDate: null,
      minPayout: 370,
      searchURL: '',
      sortOrder: 'asc',
      startDate: null,
      originCity: {
        name: 'OXNARD',
        latitude: 34.200769,
        longitude: -119.21469,
        stateCode: 'CA',
        uniqueKey: '34.200769OXNARD, CA',
        isAnywhere: false,
        isCityLive: false,
        displayValue: 'OXNARD, CA',
      },
      resultSize: 50,
      endCityName: null,
      maxDistance: 150,
      minDistance: null,
      sortByField: 'startTime',
      endCityRadius: 25,
      nextItemToken: 0,
      savedSearchId: '760ac7ce-eaf1-46ba-9631-6ec3265b59b5',
      startCityName: 'OXNARD',
      notificationId: '',
      auditContextMap:
        '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
      destinationCity: null,
      endCityLatitude: null,
      startCityRadius: 25,
      endCityLongitude: null,
      endCityStateCode: null,
      isOriginCityLive: false,
      driverTypeFilters: [],
      isAutoRefreshCall: true,
      startCityLatitude: 34.200769,
      loadingTypeFilters: [],
      startCityLongitude: -119.21469,
      startCityStateCode: 'CA',
      endCityDisplayValue: null,
      minPricePerDistance: null,
      equipmentTypeFilters: [
        'FIFTY_THREE_FOOT_TRUCK',
        'SKIRTED_FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_DRY_VAN',
        'FIFTY_THREE_FOOT_A5_AIR_TRAILER',
        'FORTY_FIVE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      maximumNumberOfStops: 3,
      trailerStatusFilters: ['PROVIDED'],
      visibilityStatusType: 'ALL',
      exclusionCitiesFilter: null,
      isDestinationCityLive: null,
      startCityDisplayValue: 'OXNARD, CA',
      maximumDurationInMillis: null,
      minimumDurationInMillis: null,
      workOpportunityTypeList: ['ONE_WAY'],
      uiiaCertificationsFilter: [],
      workOpportunityAccessType: null,
      equipmentTypeFiltersForTags: [
        'FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      workOpportunityOperatingRegionFilter: [],
      multiselectDestinationCitiesRadiusFilters:
        '[{"cityLatitude":34.097421,"cityLongitude":-117.45924,"cityName":"FONTANA","cityStateCode":"CA","cityDisplayValue":"FONTANA, CA","radius":25}]',
    },
    userId: '9ebc0361-01d4-4787-a1d7-64567168bbce',
    bookLimit: 1,
    bookLimitInterval: 24,
    blockStartTime: '2023-07-23T14:00:00.000Z',
    blockEndTime: '2023-07-24T07:00:00.000Z',
    currentBookCount: 0,
    lastBookedAt: '2023-07-23T07:15:00Z',
    createdAt: '2023-07-25T01:49:00.521Z',
    updatedAt: '2023-07-25T01:49:00.521Z',
    isTestMode: true,
  },
  {
    id: 12,
    name: 'Fontana ➡️ Oxnard',
    status: FilterStatus.PAUSED,
    payload: {
      endDate: '2023-07-29T08:00:00.000Z',
      minPayout: 450,
      searchURL: '',
      sortOrder: 'asc',
      startDate: '2023-07-29T01:59:00.000Z',
      originCity: {
        name: 'FONTANA',
        latitude: 34.097421,
        longitude: -117.45924,
        stateCode: 'CA',
        uniqueKey: '34.097421FONTANA, CA',
        isAnywhere: false,
        isCityLive: false,
        displayValue: 'FONTANA, CA',
      },
      resultSize: 50,
      endCityName: null,
      maxDistance: 150,
      minDistance: null,
      sortByField: 'startTime',
      endCityRadius: 25,
      nextItemToken: 0,
      savedSearchId: '4b4a3746-844b-45aa-8f18-23b30faa597b',
      startCityName: 'FONTANA',
      notificationId: '',
      auditContextMap:
        '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
      destinationCity: null,
      endCityLatitude: null,
      startCityRadius: 25,
      endCityLongitude: null,
      endCityStateCode: null,
      isOriginCityLive: false,
      driverTypeFilters: ['SINGLE_DRIVER'],
      isAutoRefreshCall: false,
      startCityLatitude: 34.097421,
      loadingTypeFilters: ['DROP'],
      startCityLongitude: -117.45924,
      startCityStateCode: 'CA',
      endCityDisplayValue: null,
      minPricePerDistance: null,
      equipmentTypeFilters: [
        'FIFTY_THREE_FOOT_TRUCK',
        'SKIRTED_FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_DRY_VAN',
        'FIFTY_THREE_FOOT_A5_AIR_TRAILER',
        'FORTY_FIVE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      maximumNumberOfStops: 3,
      trailerStatusFilters: ['PROVIDED'],
      visibilityStatusType: 'ALL',
      exclusionCitiesFilter: null,
      isDestinationCityLive: null,
      startCityDisplayValue: 'FONTANA, CA',
      maximumDurationInMillis: null,
      minimumDurationInMillis: null,
      workOpportunityTypeList: ['ONE_WAY', 'ROUND_TRIP'],
      uiiaCertificationsFilter: [],
      workOpportunityAccessType: null,
      equipmentTypeFiltersForTags: [
        'FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      workOpportunityOperatingRegionFilter: [],
      multiselectDestinationCitiesRadiusFilters:
        '[{"cityLatitude":34.200769,"cityLongitude":-119.21469,"cityName":"OXNARD","cityStateCode":"CA","cityDisplayValue":"OXNARD, CA","radius":25}]',
    },
    userId: '9ebc0361-01d4-4787-a1d7-64567168bbce',
    bookLimit: 1,
    bookLimitInterval: 24,
    blockStartTime: '2023-07-23T14:00:00.000Z',
    blockEndTime: '2023-07-24T07:00:00.000Z',
    currentBookCount: 0,
    lastBookedAt: '2023-07-23T05:45:00Z',
    createdAt: '2023-07-25T01:49:00.655Z',
    updatedAt: '2023-07-25T01:49:00.655Z',
    isTestMode: true,
  },
  {
    id: 13,
    name: 'Fontana ➡️ San Diego',
    status: FilterStatus.PAUSED,
    payload: {
      endDate: null,
      minPayout: 420,
      searchURL: '',
      sortOrder: 'asc',
      startDate: null,
      originCity: {
        name: 'Fontana',
        latitude: 34.04887,
        longitude: -117.44734,
        stateCode: 'CA',
        uniqueKey: '34.04887Fontana, CA',
        isAnywhere: false,
        isCityLive: false,
        displayValue: 'Fontana, CA',
      },
      resultSize: 50,
      endCityName: null,
      maxDistance: 150,
      minDistance: null,
      sortByField: 'startTime',
      endCityRadius: 25,
      nextItemToken: 0,
      savedSearchId: 'd00532dd-6e09-4a4f-927b-d90ab480dcd7',
      startCityName: 'Fontana',
      notificationId: '',
      auditContextMap:
        '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
      destinationCity: null,
      endCityLatitude: null,
      startCityRadius: 25,
      endCityLongitude: null,
      endCityStateCode: null,
      isOriginCityLive: false,
      driverTypeFilters: [],
      isAutoRefreshCall: false,
      startCityLatitude: 34.04887,
      loadingTypeFilters: ['DROP'],
      startCityLongitude: -117.44734,
      startCityStateCode: 'CA',
      endCityDisplayValue: null,
      minPricePerDistance: null,
      equipmentTypeFilters: ['FIFTY_THREE_FOOT_CONTAINER'],
      maximumNumberOfStops: 3,
      trailerStatusFilters: ['PROVIDED'],
      visibilityStatusType: 'ALL',
      exclusionCitiesFilter: null,
      isDestinationCityLive: null,
      startCityDisplayValue: 'Fontana, CA',
      maximumDurationInMillis: null,
      minimumDurationInMillis: null,
      workOpportunityTypeList: ['ONE_WAY', 'ROUND_TRIP'],
      uiiaCertificationsFilter: [],
      workOpportunityAccessType: null,
      equipmentTypeFiltersForTags: ['FIFTY_THREE_FOOT_CONTAINER'],
      workOpportunityOperatingRegionFilter: [],
      multiselectDestinationCitiesRadiusFilters:
        '[{"cityLatitude":32.814977,"cityLongitude":-117.135562,"cityName":"SAN DIEGO","cityStateCode":"CA","cityDisplayValue":"SAN DIEGO, CA","radius":25}]',
    },
    userId: '9ebc0361-01d4-4787-a1d7-64567168bbce',
    bookLimit: 1,
    bookLimitInterval: 24,
    blockStartTime: '2023-07-23T14:00:00.000Z',
    blockEndTime: '2023-07-24T07:00:00.000Z',
    currentBookCount: 0,
    lastBookedAt: '2023-07-25T01:00:00Z',
    createdAt: '2023-07-25T01:49:00.780Z',
    updatedAt: '2023-07-25T01:49:00.780Z',
    isTestMode: true,
  },
  {
    id: 14,
    name: 'Fontana ➡️ Bakersfield',
    status: FilterStatus.PAUSED,
    payload: {
      endDate: null,
      minPayout: 520,
      searchURL: '',
      sortOrder: 'asc',
      startDate: null,
      originCity: {
        name: 'FONTANA',
        latitude: 34.097421,
        longitude: -117.45924,
        stateCode: 'CA',
        uniqueKey: '34.097421FONTANA, CA',
        isAnywhere: false,
        isCityLive: false,
        displayValue: 'FONTANA, CA',
      },
      resultSize: 50,
      endCityName: null,
      maxDistance: 230,
      minDistance: null,
      sortByField: 'startTime',
      endCityRadius: 25,
      nextItemToken: 0,
      savedSearchId: '613cac74-cc76-4b68-8829-a9d07428ab7a',
      startCityName: 'FONTANA',
      notificationId: '',
      auditContextMap:
        '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
      destinationCity: null,
      endCityLatitude: null,
      startCityRadius: 25,
      endCityLongitude: null,
      endCityStateCode: null,
      isOriginCityLive: false,
      driverTypeFilters: ['SINGLE_DRIVER'],
      isAutoRefreshCall: false,
      startCityLatitude: 34.097421,
      loadingTypeFilters: ['DROP'],
      startCityLongitude: -117.45924,
      startCityStateCode: 'CA',
      endCityDisplayValue: null,
      minPricePerDistance: null,
      equipmentTypeFilters: [
        'FIFTY_THREE_FOOT_TRUCK',
        'SKIRTED_FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_DRY_VAN',
        'FIFTY_THREE_FOOT_A5_AIR_TRAILER',
        'FORTY_FIVE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      maximumNumberOfStops: 3,
      trailerStatusFilters: ['PROVIDED'],
      visibilityStatusType: 'ALL',
      exclusionCitiesFilter: null,
      isDestinationCityLive: null,
      startCityDisplayValue: 'FONTANA, CA',
      maximumDurationInMillis: null,
      minimumDurationInMillis: null,
      workOpportunityTypeList: ['ONE_WAY', 'ROUND_TRIP'],
      uiiaCertificationsFilter: [],
      workOpportunityAccessType: null,
      equipmentTypeFiltersForTags: [
        'FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      workOpportunityOperatingRegionFilter: [],
      multiselectDestinationCitiesRadiusFilters:
        '[{"cityLatitude":35.35289,"cityLongitude":-119.035333,"cityName":"BAKERSFIELD","cityStateCode":"CA","cityDisplayValue":"BAKERSFIELD, CA","radius":25}]',
    },
    userId: '9ebc0361-01d4-4787-a1d7-64567168bbce',
    bookLimit: 1,
    bookLimitInterval: 24,
    blockStartTime: '2023-07-23T14:00:00.000Z',
    blockEndTime: '2023-07-24T07:00:00.000Z',
    currentBookCount: 0,
    lastBookedAt: '2023-07-23T04:45:00Z',
    createdAt: '2023-07-25T01:49:00.912Z',
    updatedAt: '2023-07-25T01:49:00.912Z',
    isTestMode: true,
  },
  {
    id: 15,
    name: 'eBakersfield ➡️ Fontana',
    status: FilterStatus.PAUSED,
    payload: {
      endDate: null,
      minPayout: 390,
      searchURL: '',
      sortOrder: 'asc',
      startDate: '2023-08-09T18:37:00.000Z',
      originCity: {
        name: 'BAKERSFIELD',
        latitude: 35.35289,
        longitude: -119.035333,
        stateCode: 'CA',
        uniqueKey: '35.35289BAKERSFIELD, CA',
        isAnywhere: false,
        isCityLive: false,
        displayValue: 'BAKERSFIELD, CA',
      },
      resultSize: 50,
      endCityName: null,
      maxDistance: 220,
      minDistance: null,
      sortByField: 'startTime',
      endCityRadius: 25,
      nextItemToken: 0,
      savedSearchId: '6d6364c5-dc09-4e79-ba38-3fa0c6bab07b',
      startCityName: 'BAKERSFIELD',
      notificationId: '',
      auditContextMap:
        '{"rlbChannel":"EXACT_MATCH","isOriginCityLive":"false","isDestinationCityLive":"false","source":"AVAILABLE_WORK"}',
      destinationCity: null,
      endCityLatitude: null,
      startCityRadius: 25,
      endCityLongitude: null,
      endCityStateCode: null,
      isOriginCityLive: false,
      driverTypeFilters: [],
      isAutoRefreshCall: false,
      startCityLatitude: 35.35289,
      loadingTypeFilters: ['DROP'],
      startCityLongitude: -119.035333,
      startCityStateCode: 'CA',
      endCityDisplayValue: null,
      minPricePerDistance: null,
      equipmentTypeFilters: [
        'FIFTY_THREE_FOOT_TRUCK',
        'SKIRTED_FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_DRY_VAN',
        'FIFTY_THREE_FOOT_A5_AIR_TRAILER',
        'FORTY_FIVE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      maximumNumberOfStops: 3,
      trailerStatusFilters: ['PROVIDED'],
      visibilityStatusType: 'ALL',
      exclusionCitiesFilter: null,
      isDestinationCityLive: null,
      startCityDisplayValue: 'BAKERSFIELD, CA',
      maximumDurationInMillis: null,
      minimumDurationInMillis: null,
      workOpportunityTypeList: ['ONE_WAY', 'ROUND_TRIP'],
      uiiaCertificationsFilter: [],
      workOpportunityAccessType: null,
      equipmentTypeFiltersForTags: [
        'FIFTY_THREE_FOOT_TRUCK',
        'FIFTY_THREE_FOOT_CONTAINER',
      ],
      workOpportunityOperatingRegionFilter: [],
      multiselectDestinationCitiesRadiusFilters:
        '[{"cityLatitude":34.097421,"cityLongitude":-117.45924,"cityName":"FONTANA","cityStateCode":"CA","cityDisplayValue":"FONTANA, CA","radius":25}]',
    },
    userId: '9ebc0361-01d4-4787-a1d7-64567168bbce',
    bookLimit: 1,
    bookLimitInterval: 24,
    blockStartTime: '2023-07-23T14:00:00.000Z',
    blockEndTime: '2023-07-24T07:00:00.000Z',
    currentBookCount: 0,
    lastBookedAt: '2023-07-23T03:36:00Z',
    createdAt: '2023-07-25T01:49:01.043Z',
    updatedAt: '2023-08-01T15:53:53.623Z',
    isTestMode: true,
  },
];
