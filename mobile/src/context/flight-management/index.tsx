import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { IAirplane, IFlight, IFlightDetails, IRoute } from "../../models";
import ApiService from "../../api";
import { useAuth } from "../Auth";

interface IFlightManagementContext {
  loading: boolean;
  error: string | null;
  routes: IRoute[];
  airplanes: IAirplane[];
  flights: IFlight[];
  selectedFlight: IFlightDetails | null;
  createRoute: (origin: string, destination: string) => Promise<IRoute>;
  registerPlane: (
    name: string,
    model: string,
    capacity: number
  ) => Promise<void>;
  fetchRoutes: () => void;
  fetchFlights: () => void;
  fetchFlightDetails: (flightId: number) => void;
  filterFlights: (
    origin: string,
    destination: string,
    departure: string
  ) => void;
  createReservation: (flightId: number, seatId: number) => Promise<void>;
  getAvailablePlanes: (departureTime: string, arrivalTime: string) => void;
  createFlight: (
    departureTime: string,
    arrivalTime: string,
    flightNumber: string,
    price: number,
    routeId: number,
    airplaneId: number
  ) => Promise<void>;
}

export const FlightManagementContext = createContext<IFlightManagementContext>({
  loading: false,
  error: null,
  routes: [],
  airplanes: [],
  flights: [],
  selectedFlight: null,
  createRoute: () => new Promise(() => {}),
  registerPlane: () => new Promise(() => {}),
  createFlight: () => new Promise(() => {}),
  createReservation: () => new Promise(() => {}),
  fetchRoutes: () => {},
  fetchFlights: () => {},
  fetchFlightDetails: () => {},
  filterFlights: () => {},
  getAvailablePlanes: () => {},
} as IFlightManagementContext);

export const useFlightManagement = () => useContext(FlightManagementContext);

const FlightManagementProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [airplanes, setAirplanes] = useState<IAirplane[]>([]);
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<IFlightDetails | null>(
    null
  );

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await ApiService.get("routes/", accessToken);
      setRoutes(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await ApiService.get("flight/", accessToken);
      setFlights(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFlightDetails = async (flightId: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log(flightId);
      const { data } = await ApiService.get(`flight/${flightId}`, accessToken);
      console.log(data);
      setSelectedFlight(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAvailablePlanes = async (
    departureTime: string,
    arrivalTime: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await ApiService.get("airplane/available", accessToken, {
        departureTime,
        arrivalTime,
      });
      setAirplanes(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterFlights = async (
    origin: string,
    destination: string,
    departure: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await ApiService.get("flight/filter", accessToken, {
        origin,
        destination,
        departure,
      });
      setFlights(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createRoute = (origin: string, destination: string) => {
    return new Promise<IRoute>(async (resolve, reject) => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await ApiService.post(
          "routes/create",
          {
            origin,
            destination,
          },
          accessToken
        );
        setRoutes([...routes, data]);
        resolve(data);
      } catch (error: any) {
        setError(error.message);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  const createReservation = (flightId: number, seatId: number) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setLoading(true);
        setError(null);
        await ApiService.post(
          "booking/create",
          {
            flightId,
            seatId,
          },
          accessToken
        );
        resolve();
      } catch (error: any) {
        setError(error.message);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  const registerPlane = (name: string, model: string, capacity: number) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setLoading(true);
        setError(null);
        await ApiService.post(
          "airplane/create",
          {
            name,
            model,
            capacity,
          },
          accessToken
        );
        resolve();
      } catch (error: any) {
        setError(error.message);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  const createFlight = async (
    departureTime: string,
    arrivalTime: string,
    flightNumber: string,
    price: number,
    routeId: number,
    airplaneId: number
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await ApiService.post(
          "flight/create",
          {
            flightNumber,
            price,
            departureTime,
            arrivalTime,
            routeId,
            airplaneId,
          },
          accessToken
        );
        setFlights([...flights, data]);
        resolve();
      } catch (error: any) {
        setError(error.message);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <FlightManagementContext.Provider
      value={{
        routes,
        airplanes,
        flights,
        selectedFlight,
        loading,
        error,
        getAvailablePlanes,
        createRoute,
        createReservation,
        registerPlane,
        fetchRoutes,
        fetchFlights,
        fetchFlightDetails,
        filterFlights,
        createFlight,
      }}
    >
      {children}
    </FlightManagementContext.Provider>
  );
};

export default FlightManagementProvider;
