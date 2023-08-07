export interface ICity extends IOriginCity {
  stateName: string;
  countyFips: number;
  countyName: string;
  population: number;
  density: number;
  source: string;
  military: boolean;
  incorporated: boolean;
  timezone: string;
  ranking: number;
  zips: string;
  id: number;
}
export interface IDestinationCity {
  cityLatitude: number;
  cityLongitude: number;
  cityName: string;
  cityStateCode: string;
  cityDisplayValue: string;
  radius: number;
}

export interface IOriginCity {
  name: string;
  latitude: number;
  longitude: number;
  stateCode: string;
}

export interface IOriginRelay extends IOriginCity {
  uniqueKey: string;
  isAnywhere: boolean;
  isCityLive: boolean;
  displayValue: string;
}

export enum FilterStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
}

export interface IFilterPayload {
  workOpportunityTypeList: string[];
  originCity: IOriginRelay;
  startCityName: string;
  startCityStateCode: string;
  startCityLatitude: number;
  startCityLongitude: number;
  startCityDisplayValue: string;
  isOriginCityLive: boolean;
  startCityRadius: number;
  destinationCity: null;
  multiselectDestinationCitiesRadiusFilters: string | null;
  exclusionCitiesFilter: null;
  endCityName: null;
  endCityStateCode: null;
  endCityDisplayValue: null;
  endCityLatitude: null;
  endCityLongitude: null;
  isDestinationCityLive: null;
  endCityRadius: number | null;
  startDate: string | null;
  endDate: string | null;
  minDistance: number | null;
  maxDistance: number | null;
  minimumDurationInMillis: number | null;
  maximumDurationInMillis: number | null;
  minPayout: number;
  minPricePerDistance: number | null;
  trailerStatusFilters: string[];
  equipmentTypeFilters: string[];
  equipmentTypeFiltersForTags: string[];
  driverTypeFilters: any[];
  uiiaCertificationsFilter: any[] | null;
  workOpportunityOperatingRegionFilter: any[];
  loadingTypeFilters: any[];
  maximumNumberOfStops: number | null;
  workOpportunityAccessType: null;
  sortByField: string;
  sortOrder: string;
  visibilityStatusType: string;
  nextItemToken: number;
  resultSize: number;
  searchURL: string;
  savedSearchId: string;
  isAutoRefreshCall: boolean;
  notificationId: string;
  auditContextMap: string;
}

export interface IFilter {
  id: number;
  name: string;
  status: FilterStatus;
  intervalId?: ReturnType<typeof setInterval>;
  payload: IFilterPayload;
  bookLimit: number;
  currentBookCount: number;
  lastBookedAt: string | null;
  bookLimitInterval: number;
  blockStartTime: string | null;
  blockEndTime: string | null;
  isTestMode: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
