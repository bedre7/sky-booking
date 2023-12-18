import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { IRoute } from "../../models";
import ApiService from "../../api";
import { useAuth } from "../Auth";

interface IFlightManagementContext {
  loading: boolean;
  error: string | null;
  createRoute: (origin: string, destination: string) => Promise<IRoute>;
  registerPlane: (
    name: string,
    model: string,
    capacity: number
  ) => Promise<void>;
  fetchRoutes: () => void;
}

export const FlightManagementContext = createContext<IFlightManagementContext>({
  loading: false,
  error: null,
  createRoute: () => new Promise(() => {}),
  registerPlane: () => new Promise(() => {}),
  fetchRoutes: () => {},
} as IFlightManagementContext);

export const useFlightManagement = () => useContext(FlightManagementContext);

const FlightManagementProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routes, setRoutes] = useState<IRoute[]>([]);

  // make this function return a promise that resolves with the created route
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

  return (
    <FlightManagementContext.Provider
      value={{ loading, error, createRoute, registerPlane, fetchRoutes }}
    >
      {children}
    </FlightManagementContext.Provider>
  );
};

export default FlightManagementProvider;
