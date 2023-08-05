import {useState} from "react";
import Panel from '@/components/panel'
import {convertToLosAngeles} from "@/app/helper";
import {PencilIcon, PauseIcon, PlayIcon} from "@heroicons/react/24/outline";

export enum FilterStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
}

export interface IFilterPayload {
  workOpportunityTypeList: string[];
  originCity: OriginCity;
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
  minDistance: null;
  maxDistance: number;
  minimumDurationInMillis: null;
  maximumDurationInMillis: null;
  minPayout: number;
  minPricePerDistance: number | null
  trailerStatusFilters: string[];
  equipmentTypeFilters: string[];
  equipmentTypeFiltersForTags: string[];
  driverTypeFilters: any[];
  uiiaCertificationsFilter: any[] | null;
  workOpportunityOperatingRegionFilter: any[];
  loadingTypeFilters: any[];
  maximumNumberOfStops: number | null
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

export interface OriginCity {
  name: string;
  stateCode: string;
  latitude: number;
  longitude: number;
  displayValue: string;
  isCityLive: boolean;
  isAnywhere: boolean;
  uniqueKey: string;
}


export interface IFilter {
  id: number
  name: string
  status: FilterStatus
  intervalId?: ReturnType<typeof setInterval>
  payload: IFilterPayload
  bookLimit: number
  currentBookCount: number
  lastBookedAt: string | null
  bookLimitInterval: number
  blockStartTime: string | null
  blockEndTime: string | null
  isTestMode: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

const filters: IFilter[] = [
  {
    "id": 2,
    "name": "BSNF Short",
    "status": FilterStatus.ACTIVE,
    "payload": {
      "endDate": null,
      "minPayout": 200,
      "searchURL": "",
      "sortOrder": "asc",
      "startDate": "2023-07-20T09:00:00.000Z",
      "originCity": {
        "name": "Fontana",
        "latitude": 34.04887,
        "longitude": -117.44734,
        "stateCode": "CA",
        "uniqueKey": "34.04887Fontana, CA",
        "isAnywhere": false,
        "isCityLive": false,
        "displayValue": "Fontana, CA"
      },
      "resultSize": 100,
      "endCityName": null,
      "maxDistance": 35,
      "minDistance": null,
      "sortByField": "startTime",
      "endCityRadius": null,
      "nextItemToken": 0,
      "savedSearchId": "a91b9906-cce6-4f00-b81a-c21fdc380e12",
      "startCityName": "Fontana",
      "notificationId": "",
      "auditContextMap": "{\"rlbChannel\":\"EXACT_MATCH\",\"isOriginCityLive\":\"false\",\"isDestinationCityLive\":\"false\",\"source\":\"AVAILABLE_WORK\"}",
      "destinationCity": null,
      "endCityLatitude": null,
      "startCityRadius": 25,
      "endCityLongitude": null,
      "endCityStateCode": null,
      "isOriginCityLive": false,
      "driverTypeFilters": [],
      "isAutoRefreshCall": true,
      "startCityLatitude": 34.04887,
      "loadingTypeFilters": [
        "DROP"
      ],
      "startCityLongitude": -117.44734,
      "startCityStateCode": "CA",
      "endCityDisplayValue": null,
      "minPricePerDistance": null,
      "equipmentTypeFilters": [
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "maximumNumberOfStops": 2,
      "trailerStatusFilters": [
        "PROVIDED"
      ],
      "visibilityStatusType": "ALL",
      "exclusionCitiesFilter": null,
      "isDestinationCityLive": null,
      "startCityDisplayValue": "Fontana, CA",
      "maximumDurationInMillis": null,
      "minimumDurationInMillis": null,
      "workOpportunityTypeList": [
        "ONE_WAY"
      ],
      "uiiaCertificationsFilter": null,
      "workOpportunityAccessType": null,
      "equipmentTypeFiltersForTags": [
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "workOpportunityOperatingRegionFilter": [],
      "multiselectDestinationCitiesRadiusFilters": null
    },
    "userId": "9ebc0361-01d4-4787-a1d7-64567168bbce",
    "bookLimit": 30,
    "bookLimitInterval": 48,
    "blockStartTime": "2023-07-23T14:00:00.000Z",
    "blockEndTime": "2023-07-24T14:00:00.000Z",
    "currentBookCount": 0,
    "lastBookedAt": "2023-08-03T05:00:00Z",
    "createdAt": "2023-04-23T22:15:22.916Z",
    "updatedAt": "2023-08-02T01:50:34.899Z",
    "isTestMode": true
  },
  {
    "id": 10,
    "name": "San Diego ➡️ Fontana",
    "status": FilterStatus.PAUSED,
    "payload": {
      "endDate": null,
      "minPayout": 385,
      "searchURL": "",
      "sortOrder": "asc",
      "startDate": null,
      "originCity": {
        "name": "SAN DIEGO",
        "latitude": 32.814977,
        "longitude": -117.135562,
        "stateCode": "CA",
        "uniqueKey": "32.814977SAN DIEGO, CA",
        "isAnywhere": false,
        "isCityLive": false,
        "displayValue": "SAN DIEGO, CA"
      },
      "resultSize": 50,
      "endCityName": null,
      "maxDistance": 150,
      "minDistance": null,
      "sortByField": "startTime",
      "endCityRadius": 25,
      "nextItemToken": 0,
      "savedSearchId": "4f6f8365-9dc9-45e3-b62b-a3e31996d11f",
      "startCityName": "SAN DIEGO",
      "notificationId": "",
      "auditContextMap": "{\"rlbChannel\":\"EXACT_MATCH\",\"isOriginCityLive\":\"false\",\"isDestinationCityLive\":\"false\",\"source\":\"AVAILABLE_WORK\"}",
      "destinationCity": null,
      "endCityLatitude": null,
      "startCityRadius": 25,
      "endCityLongitude": null,
      "endCityStateCode": null,
      "isOriginCityLive": false,
      "driverTypeFilters": [],
      "isAutoRefreshCall": true,
      "startCityLatitude": 32.814977,
      "loadingTypeFilters": [
        "DROP"
      ],
      "startCityLongitude": -117.135562,
      "startCityStateCode": "CA",
      "endCityDisplayValue": null,
      "minPricePerDistance": null,
      "equipmentTypeFilters": [
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "maximumNumberOfStops": 3,
      "trailerStatusFilters": [
        "PROVIDED"
      ],
      "visibilityStatusType": "ALL",
      "exclusionCitiesFilter": null,
      "isDestinationCityLive": null,
      "startCityDisplayValue": "SAN DIEGO, CA",
      "maximumDurationInMillis": null,
      "minimumDurationInMillis": null,
      "workOpportunityTypeList": [
        "ONE_WAY",
        "ROUND_TRIP"
      ],
      "uiiaCertificationsFilter": [],
      "workOpportunityAccessType": null,
      "equipmentTypeFiltersForTags": [
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "workOpportunityOperatingRegionFilter": [],
      "multiselectDestinationCitiesRadiusFilters": "[{\"cityLatitude\":34.097421,\"cityLongitude\":-117.45924,\"cityName\":\"FONTANA\",\"cityStateCode\":\"CA\",\"cityDisplayValue\":\"FONTANA, CA\",\"radius\":25}]"
    },
    "userId": "9ebc0361-01d4-4787-a1d7-64567168bbce",
    "bookLimit": 1,
    "bookLimitInterval": 24,
    "blockStartTime": "2023-07-23T14:00:00.000Z",
    "blockEndTime": "2023-07-24T07:00:00.000Z",
    "currentBookCount": 0,
    "lastBookedAt": "2023-07-23T10:45:00Z",
    "createdAt": "2023-07-25T01:49:00.083Z",
    "updatedAt": "2023-07-25T01:49:00.083Z",
    "isTestMode": true
  },
  {
    "id": 11,
    "name": "Oxnard ➡️ Fontana",
    "status": FilterStatus.PAUSED,
    "payload": {
      "endDate": null,
      "minPayout": 370,
      "searchURL": "",
      "sortOrder": "asc",
      "startDate": null,
      "originCity": {
        "name": "OXNARD",
        "latitude": 34.200769,
        "longitude": -119.21469,
        "stateCode": "CA",
        "uniqueKey": "34.200769OXNARD, CA",
        "isAnywhere": false,
        "isCityLive": false,
        "displayValue": "OXNARD, CA"
      },
      "resultSize": 50,
      "endCityName": null,
      "maxDistance": 150,
      "minDistance": null,
      "sortByField": "startTime",
      "endCityRadius": 25,
      "nextItemToken": 0,
      "savedSearchId": "760ac7ce-eaf1-46ba-9631-6ec3265b59b5",
      "startCityName": "OXNARD",
      "notificationId": "",
      "auditContextMap": "{\"rlbChannel\":\"EXACT_MATCH\",\"isOriginCityLive\":\"false\",\"isDestinationCityLive\":\"false\",\"source\":\"AVAILABLE_WORK\"}",
      "destinationCity": null,
      "endCityLatitude": null,
      "startCityRadius": 25,
      "endCityLongitude": null,
      "endCityStateCode": null,
      "isOriginCityLive": false,
      "driverTypeFilters": [],
      "isAutoRefreshCall": true,
      "startCityLatitude": 34.200769,
      "loadingTypeFilters": [],
      "startCityLongitude": -119.21469,
      "startCityStateCode": "CA",
      "endCityDisplayValue": null,
      "minPricePerDistance": null,
      "equipmentTypeFilters": [
        "FIFTY_THREE_FOOT_TRUCK",
        "SKIRTED_FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_DRY_VAN",
        "FIFTY_THREE_FOOT_A5_AIR_TRAILER",
        "FORTY_FIVE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "maximumNumberOfStops": 3,
      "trailerStatusFilters": [
        "PROVIDED"
      ],
      "visibilityStatusType": "ALL",
      "exclusionCitiesFilter": null,
      "isDestinationCityLive": null,
      "startCityDisplayValue": "OXNARD, CA",
      "maximumDurationInMillis": null,
      "minimumDurationInMillis": null,
      "workOpportunityTypeList": [
        "ONE_WAY"
      ],
      "uiiaCertificationsFilter": [],
      "workOpportunityAccessType": null,
      "equipmentTypeFiltersForTags": [
        "FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "workOpportunityOperatingRegionFilter": [],
      "multiselectDestinationCitiesRadiusFilters": "[{\"cityLatitude\":34.097421,\"cityLongitude\":-117.45924,\"cityName\":\"FONTANA\",\"cityStateCode\":\"CA\",\"cityDisplayValue\":\"FONTANA, CA\",\"radius\":25}]"
    },
    "userId": "9ebc0361-01d4-4787-a1d7-64567168bbce",
    "bookLimit": 1,
    "bookLimitInterval": 24,
    "blockStartTime": "2023-07-23T14:00:00.000Z",
    "blockEndTime": "2023-07-24T07:00:00.000Z",
    "currentBookCount": 0,
    "lastBookedAt": "2023-07-23T07:15:00Z",
    "createdAt": "2023-07-25T01:49:00.521Z",
    "updatedAt": "2023-07-25T01:49:00.521Z",
    "isTestMode": true
  },
  {
    "id": 12,
    "name": "Fontana ➡️ Oxnard",
    "status": FilterStatus.PAUSED,
    "payload": {
      "endDate": "2023-07-29T08:00:00.000Z",
      "minPayout": 450,
      "searchURL": "",
      "sortOrder": "asc",
      "startDate": "2023-07-29T01:59:00.000Z",
      "originCity": {
        "name": "FONTANA",
        "latitude": 34.097421,
        "longitude": -117.45924,
        "stateCode": "CA",
        "uniqueKey": "34.097421FONTANA, CA",
        "isAnywhere": false,
        "isCityLive": false,
        "displayValue": "FONTANA, CA"
      },
      "resultSize": 50,
      "endCityName": null,
      "maxDistance": 150,
      "minDistance": null,
      "sortByField": "startTime",
      "endCityRadius": 25,
      "nextItemToken": 0,
      "savedSearchId": "4b4a3746-844b-45aa-8f18-23b30faa597b",
      "startCityName": "FONTANA",
      "notificationId": "",
      "auditContextMap": "{\"rlbChannel\":\"EXACT_MATCH\",\"isOriginCityLive\":\"false\",\"isDestinationCityLive\":\"false\",\"source\":\"AVAILABLE_WORK\"}",
      "destinationCity": null,
      "endCityLatitude": null,
      "startCityRadius": 25,
      "endCityLongitude": null,
      "endCityStateCode": null,
      "isOriginCityLive": false,
      "driverTypeFilters": [
        "SINGLE_DRIVER"
      ],
      "isAutoRefreshCall": false,
      "startCityLatitude": 34.097421,
      "loadingTypeFilters": [
        "DROP"
      ],
      "startCityLongitude": -117.45924,
      "startCityStateCode": "CA",
      "endCityDisplayValue": null,
      "minPricePerDistance": null,
      "equipmentTypeFilters": [
        "FIFTY_THREE_FOOT_TRUCK",
        "SKIRTED_FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_DRY_VAN",
        "FIFTY_THREE_FOOT_A5_AIR_TRAILER",
        "FORTY_FIVE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "maximumNumberOfStops": 3,
      "trailerStatusFilters": [
        "PROVIDED"
      ],
      "visibilityStatusType": "ALL",
      "exclusionCitiesFilter": null,
      "isDestinationCityLive": null,
      "startCityDisplayValue": "FONTANA, CA",
      "maximumDurationInMillis": null,
      "minimumDurationInMillis": null,
      "workOpportunityTypeList": [
        "ONE_WAY",
        "ROUND_TRIP"
      ],
      "uiiaCertificationsFilter": [],
      "workOpportunityAccessType": null,
      "equipmentTypeFiltersForTags": [
        "FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "workOpportunityOperatingRegionFilter": [],
      "multiselectDestinationCitiesRadiusFilters": "[{\"cityLatitude\":34.200769,\"cityLongitude\":-119.21469,\"cityName\":\"OXNARD\",\"cityStateCode\":\"CA\",\"cityDisplayValue\":\"OXNARD, CA\",\"radius\":25}]"
    },
    "userId": "9ebc0361-01d4-4787-a1d7-64567168bbce",
    "bookLimit": 1,
    "bookLimitInterval": 24,
    "blockStartTime": "2023-07-23T14:00:00.000Z",
    "blockEndTime": "2023-07-24T07:00:00.000Z",
    "currentBookCount": 0,
    "lastBookedAt": "2023-07-23T05:45:00Z",
    "createdAt": "2023-07-25T01:49:00.655Z",
    "updatedAt": "2023-07-25T01:49:00.655Z",
    "isTestMode": true
  },
  {
    "id": 13,
    "name": "Fontana ➡️ San Diego",
    "status": FilterStatus.PAUSED,
    "payload": {
      "endDate": null,
      "minPayout": 420,
      "searchURL": "",
      "sortOrder": "asc",
      "startDate": null,
      "originCity": {
        "name": "Fontana",
        "latitude": 34.04887,
        "longitude": -117.44734,
        "stateCode": "CA",
        "uniqueKey": "34.04887Fontana, CA",
        "isAnywhere": false,
        "isCityLive": false,
        "displayValue": "Fontana, CA"
      },
      "resultSize": 50,
      "endCityName": null,
      "maxDistance": 150,
      "minDistance": null,
      "sortByField": "startTime",
      "endCityRadius": 25,
      "nextItemToken": 0,
      "savedSearchId": "d00532dd-6e09-4a4f-927b-d90ab480dcd7",
      "startCityName": "Fontana",
      "notificationId": "",
      "auditContextMap": "{\"rlbChannel\":\"EXACT_MATCH\",\"isOriginCityLive\":\"false\",\"isDestinationCityLive\":\"false\",\"source\":\"AVAILABLE_WORK\"}",
      "destinationCity": null,
      "endCityLatitude": null,
      "startCityRadius": 25,
      "endCityLongitude": null,
      "endCityStateCode": null,
      "isOriginCityLive": false,
      "driverTypeFilters": [],
      "isAutoRefreshCall": false,
      "startCityLatitude": 34.04887,
      "loadingTypeFilters": [
        "DROP"
      ],
      "startCityLongitude": -117.44734,
      "startCityStateCode": "CA",
      "endCityDisplayValue": null,
      "minPricePerDistance": null,
      "equipmentTypeFilters": [
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "maximumNumberOfStops": 3,
      "trailerStatusFilters": [
        "PROVIDED"
      ],
      "visibilityStatusType": "ALL",
      "exclusionCitiesFilter": null,
      "isDestinationCityLive": null,
      "startCityDisplayValue": "Fontana, CA",
      "maximumDurationInMillis": null,
      "minimumDurationInMillis": null,
      "workOpportunityTypeList": [
        "ONE_WAY",
        "ROUND_TRIP"
      ],
      "uiiaCertificationsFilter": [],
      "workOpportunityAccessType": null,
      "equipmentTypeFiltersForTags": [
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "workOpportunityOperatingRegionFilter": [],
      "multiselectDestinationCitiesRadiusFilters": "[{\"cityLatitude\":32.814977,\"cityLongitude\":-117.135562,\"cityName\":\"SAN DIEGO\",\"cityStateCode\":\"CA\",\"cityDisplayValue\":\"SAN DIEGO, CA\",\"radius\":25}]"
    },
    "userId": "9ebc0361-01d4-4787-a1d7-64567168bbce",
    "bookLimit": 1,
    "bookLimitInterval": 24,
    "blockStartTime": "2023-07-23T14:00:00.000Z",
    "blockEndTime": "2023-07-24T07:00:00.000Z",
    "currentBookCount": 0,
    "lastBookedAt": "2023-07-25T01:00:00Z",
    "createdAt": "2023-07-25T01:49:00.780Z",
    "updatedAt": "2023-07-25T01:49:00.780Z",
    "isTestMode": true
  },
  {
    "id": 14,
    "name": "Fontana ➡️ Bakersfield",
    "status": FilterStatus.PAUSED,
    "payload": {
      "endDate": null,
      "minPayout": 520,
      "searchURL": "",
      "sortOrder": "asc",
      "startDate": null,
      "originCity": {
        "name": "FONTANA",
        "latitude": 34.097421,
        "longitude": -117.45924,
        "stateCode": "CA",
        "uniqueKey": "34.097421FONTANA, CA",
        "isAnywhere": false,
        "isCityLive": false,
        "displayValue": "FONTANA, CA"
      },
      "resultSize": 50,
      "endCityName": null,
      "maxDistance": 230,
      "minDistance": null,
      "sortByField": "startTime",
      "endCityRadius": 25,
      "nextItemToken": 0,
      "savedSearchId": "613cac74-cc76-4b68-8829-a9d07428ab7a",
      "startCityName": "FONTANA",
      "notificationId": "",
      "auditContextMap": "{\"rlbChannel\":\"EXACT_MATCH\",\"isOriginCityLive\":\"false\",\"isDestinationCityLive\":\"false\",\"source\":\"AVAILABLE_WORK\"}",
      "destinationCity": null,
      "endCityLatitude": null,
      "startCityRadius": 25,
      "endCityLongitude": null,
      "endCityStateCode": null,
      "isOriginCityLive": false,
      "driverTypeFilters": [
        "SINGLE_DRIVER"
      ],
      "isAutoRefreshCall": false,
      "startCityLatitude": 34.097421,
      "loadingTypeFilters": [
        "DROP"
      ],
      "startCityLongitude": -117.45924,
      "startCityStateCode": "CA",
      "endCityDisplayValue": null,
      "minPricePerDistance": null,
      "equipmentTypeFilters": [
        "FIFTY_THREE_FOOT_TRUCK",
        "SKIRTED_FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_DRY_VAN",
        "FIFTY_THREE_FOOT_A5_AIR_TRAILER",
        "FORTY_FIVE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "maximumNumberOfStops": 3,
      "trailerStatusFilters": [
        "PROVIDED"
      ],
      "visibilityStatusType": "ALL",
      "exclusionCitiesFilter": null,
      "isDestinationCityLive": null,
      "startCityDisplayValue": "FONTANA, CA",
      "maximumDurationInMillis": null,
      "minimumDurationInMillis": null,
      "workOpportunityTypeList": [
        "ONE_WAY",
        "ROUND_TRIP"
      ],
      "uiiaCertificationsFilter": [],
      "workOpportunityAccessType": null,
      "equipmentTypeFiltersForTags": [
        "FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "workOpportunityOperatingRegionFilter": [],
      "multiselectDestinationCitiesRadiusFilters": "[{\"cityLatitude\":35.35289,\"cityLongitude\":-119.035333,\"cityName\":\"BAKERSFIELD\",\"cityStateCode\":\"CA\",\"cityDisplayValue\":\"BAKERSFIELD, CA\",\"radius\":25}]"
    },
    "userId": "9ebc0361-01d4-4787-a1d7-64567168bbce",
    "bookLimit": 1,
    "bookLimitInterval": 24,
    "blockStartTime": "2023-07-23T14:00:00.000Z",
    "blockEndTime": "2023-07-24T07:00:00.000Z",
    "currentBookCount": 0,
    "lastBookedAt": "2023-07-23T04:45:00Z",
    "createdAt": "2023-07-25T01:49:00.912Z",
    "updatedAt": "2023-07-25T01:49:00.912Z",
    "isTestMode": true
  },
  {
    "id": 15,
    "name": "eBakersfield ➡️ Fontana",
    "status": FilterStatus.PAUSED,
    "payload": {
      "endDate": null,
      "minPayout": 390,
      "searchURL": "",
      "sortOrder": "asc",
      "startDate": "2023-08-09T18:37:00.000Z",
      "originCity": {
        "name": "BAKERSFIELD",
        "latitude": 35.35289,
        "longitude": -119.035333,
        "stateCode": "CA",
        "uniqueKey": "35.35289BAKERSFIELD, CA",
        "isAnywhere": false,
        "isCityLive": false,
        "displayValue": "BAKERSFIELD, CA"
      },
      "resultSize": 50,
      "endCityName": null,
      "maxDistance": 220,
      "minDistance": null,
      "sortByField": "startTime",
      "endCityRadius": 25,
      "nextItemToken": 0,
      "savedSearchId": "6d6364c5-dc09-4e79-ba38-3fa0c6bab07b",
      "startCityName": "BAKERSFIELD",
      "notificationId": "",
      "auditContextMap": "{\"rlbChannel\":\"EXACT_MATCH\",\"isOriginCityLive\":\"false\",\"isDestinationCityLive\":\"false\",\"source\":\"AVAILABLE_WORK\"}",
      "destinationCity": null,
      "endCityLatitude": null,
      "startCityRadius": 25,
      "endCityLongitude": null,
      "endCityStateCode": null,
      "isOriginCityLive": false,
      "driverTypeFilters": [],
      "isAutoRefreshCall": false,
      "startCityLatitude": 35.35289,
      "loadingTypeFilters": [
        "DROP"
      ],
      "startCityLongitude": -119.035333,
      "startCityStateCode": "CA",
      "endCityDisplayValue": null,
      "minPricePerDistance": null,
      "equipmentTypeFilters": [
        "FIFTY_THREE_FOOT_TRUCK",
        "SKIRTED_FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_DRY_VAN",
        "FIFTY_THREE_FOOT_A5_AIR_TRAILER",
        "FORTY_FIVE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "maximumNumberOfStops": 3,
      "trailerStatusFilters": [
        "PROVIDED"
      ],
      "visibilityStatusType": "ALL",
      "exclusionCitiesFilter": null,
      "isDestinationCityLive": null,
      "startCityDisplayValue": "BAKERSFIELD, CA",
      "maximumDurationInMillis": null,
      "minimumDurationInMillis": null,
      "workOpportunityTypeList": [
        "ONE_WAY",
        "ROUND_TRIP"
      ],
      "uiiaCertificationsFilter": [],
      "workOpportunityAccessType": null,
      "equipmentTypeFiltersForTags": [
        "FIFTY_THREE_FOOT_TRUCK",
        "FIFTY_THREE_FOOT_CONTAINER"
      ],
      "workOpportunityOperatingRegionFilter": [],
      "multiselectDestinationCitiesRadiusFilters": "[{\"cityLatitude\":34.097421,\"cityLongitude\":-117.45924,\"cityName\":\"FONTANA\",\"cityStateCode\":\"CA\",\"cityDisplayValue\":\"FONTANA, CA\",\"radius\":25}]"
    },
    "userId": "9ebc0361-01d4-4787-a1d7-64567168bbce",
    "bookLimit": 1,
    "bookLimitInterval": 24,
    "blockStartTime": "2023-07-23T14:00:00.000Z",
    "blockEndTime": "2023-07-24T07:00:00.000Z",
    "currentBookCount": 0,
    "lastBookedAt": "2023-07-23T03:36:00Z",
    "createdAt": "2023-07-25T01:49:01.043Z",
    "updatedAt": "2023-08-01T15:53:53.623Z",
    "isTestMode": true
  }
]


export default function Example() {
  const [open, setOpen] = useState(true)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">Filters</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your filters to book loads faster
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-red-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-grey-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
          >
            Add filter
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Origin -{">"} Destination
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Start Date -{">"} End Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Min Payment
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {filters.map((filter) => (
                <tr key={filter.id}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      {/*<div className="h-11 w-11 flex-shrink-0">*/}
                      {/*  <img className="h-11 w-11 rounded-full" src={person.image} alt="" />*/}
                      {/*</div>*/}
                      <div>
                        <div className="font-medium text-gray-900">{filter.name}</div>
                        {/*<div className="mt-1 text-gray-500">{filter.email}</div>*/}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div
                      className="text-gray-900">{filter.payload.startCityDisplayValue} -{">"} {filter.payload.multiselectDestinationCitiesRadiusFilters ? JSON.parse(filter.payload.multiselectDestinationCitiesRadiusFilters).map((des: any) => des.cityDisplayValue) : "Anywhere"}</div>
                    {/*<div className="mt-1 text-gray-500">{filter.payload.multiselectDestinationCitiesRadiusFilters && JSON.parse(filter.payload.multiselectDestinationCitiesRadiusFilters).map(des => des.cityDisplayValue)}</div>*/}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div
                      className="text-gray-900">{convertToLosAngeles(filter.payload.startDate, true)} -{">"} {convertToLosAngeles(filter.payload.endDate,true)}</div>
                    {/*<div className="mt-1 text-gray-500">{filter.payload.multiselectDestinationCitiesRadiusFilters && JSON.parse(filter.payload.multiselectDestinationCitiesRadiusFilters).map(des => des.cityDisplayValue)}</div>*/}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div className="font-medium text-gray-900">${filter.payload.minPayout}</div>
                    <div
                      className="mt-1 text-gray-500"> {filter.payload.minPricePerDistance && (`${filter.payload.minPricePerDistance} / mi`)}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {filter.status === FilterStatus.ACTIVE ? (<span
                      className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
  <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
    <circle cx="3" cy="3" r="3"/>
  </svg>
  Active
</span>) : (
                      <span
                        className="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
  <svg className="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
    <circle cx="3" cy="3" r="3"/>
  </svg>
  Paused
</span>)}

                  </td>

                  <td onClick={() => setOpen(true)}
                      className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <div className='flex flex-row'>                    {filter.status === FilterStatus.ACTIVE ? (
                      <PauseIcon
                        className="h-6 w-6 text-red-900 group-hover:text-gray-900 cursor-pointer"
                        aria-hidden="true"
                      />) : (<PlayIcon
                      className="h-6 w-6 text-red-900 group-hover:text-gray-900 cursor-pointer"
                      aria-hidden="true"
                    />)}
                      <PencilIcon
                        className="h-6 w-5 ml-5 text-red-900 group-hover:text-gray-900 cursor-pointer"
                        aria-hidden="true"
                      /></div>

                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Panel open={open} setOpen={setOpen}/>
    </div>
  )
}
