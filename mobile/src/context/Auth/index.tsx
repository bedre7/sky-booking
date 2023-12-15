import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { IUser } from "./types";
import { AuthService } from "../../services/";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

interface IAuthContext {
  currentUser: IUser | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, username: string) => void;
  logout: () => void;
  refresh: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  error: null,
  loading: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  refresh: () => {},
} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await AuthService.login({ email, password });
      setCurrentUser(jwtDecode(data.accessToken));
      setError(null);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await AuthService.signup({ email, username, password });
      setCurrentUser(jwtDecode(data.accessToken));
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setCurrentUser(null);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await AuthService.refresh();
      setCurrentUser(jwtDecode(data.accessToken));
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, error, loading, login, signup, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
