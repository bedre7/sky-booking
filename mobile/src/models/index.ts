export interface IRoute {
  id: number;
  origin: string;
  destination: string;
}

export interface IAirplane {
  id: number;
  name: string;
  model: string;
  capacity: number;
}

export interface IFlight {
  id: number;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price?: number;
}
