import {ApiResponse} from '../src/types/journeyTypes.ts';

export const mockApiResponse: ApiResponse = {
  days: {
    '2021-01-01': {
      date: '2021-01-01',
      journey_count: '2',
      total_miles: '100',
      total_cost: '50',
      items: [
        {
          id: 1,
          distance: '60',
          cost: '30',
          start_date: '2021-01-01T09:00:00Z',
          end_date: '2021-01-01T10:00:00Z',
          max_speed_mph: '70',
          avg_speed_mph: '50',
          per_mile_rate: '0.5',
          date: '2021-01-01',
          start: {
            crs: {
              type: 'name',
              properties: {name: 'EPSG:4326'},
            },
            type: 'Point',
            coordinates: [-0.1276, 51.5072],
            shortName: 'Start Point',
            longName: 'Start Point, London',
          },
          end: {
            crs: {
              type: 'name',
              properties: {name: 'EPSG:4326'},
            },
            type: 'Point',
            coordinates: [-0.1425, 51.501],
            shortName: 'End Point',
            longName: 'End Point, London',
          },
          location: {
            crs: {
              type: 'name',
              properties: {name: 'EPSG:4326'},
            },
            type: 'Point',
            coordinates: [-0.1276, 51.5072],
            shortName: 'Location',
            longName: 'Location, London',
          },
        },
        {
          id: 2,
          distance: '40 miles',
          cost: '20',
          start_date: '2021-01-01T11:00:00Z',
          end_date: '2021-01-01T12:00:00Z',
          max_speed_mph: '65',
          avg_speed_mph: '45',
          per_mile_rate: '0.5',
          date: '2021-01-01',
          start: {
            crs: {
              type: 'name',
              properties: {name: 'EPSG:4326'},
            },
            type: 'Point',
            coordinates: [-0.13, 51.509],
            shortName: 'Another Start',
            longName: 'Another Start Point, London',
          },
          end: {
            crs: {
              type: 'name',
              properties: {name: 'EPSG:4326'},
            },
            type: 'Point',
            coordinates: [-0.155, 51.512],
            shortName: 'Another End',
            longName: 'Another End Point, London',
          },
          location: {
            crs: {
              type: 'name',
              properties: {name: 'EPSG:4326'},
            },
            type: 'Point',
            coordinates: [-0.13, 51.509],
            shortName: 'Another Location',
            longName: 'Another Location, London',
          },
        },
      ],
      unix: 1609459200,
    },
  },
  top: 0,
  bottom: 0,
};

export default {
  getJourneys: jest.fn(() => Promise.resolve(mockApiResponse)),
};
