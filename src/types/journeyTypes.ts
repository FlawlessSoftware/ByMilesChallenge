export interface Journey {
  id: number;
  distance: string;
  cost: string;
  start_date: string;
  end_date: string;
  max_speed_mph: string;
  avg_speed_mph: string;
  per_mile_rate: string;
  date: string;
  start: Location;
  end: Location;
  location: Location;
}

interface Location {
  crs: CRS;
  type: string;
  coordinates: [number, number];
  shortName: string;
  longName: string;
}

interface CRS {
  type: string;
  properties: {
    name: string;
  };
}

export interface Day {
  date: string;
  journey_count: string;
  total_miles: string;
  total_cost: string;
  items: Journey[];
  unix: number;
}

export interface ApiResponse {
  days: {[key: string]: Day};
  top: number;
  bottom: number;
}
