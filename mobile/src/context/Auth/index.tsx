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
import { Alert } from "react-native";

interface IAuthContext {
  currentUser: IUser | null;
  error: string | null;
  loading: boolean;
  logIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, username: string) => void;
  logOut: () => void;
  refresh: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  error: null,
  loading: false,
  logIn: () => {},
  signUp: () => {},
  logOut: () => {},
  refresh: () => {},
} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await AuthService.logIn({ email, password });
      setCurrentUser(jwtDecode(data.accessToken));
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const signUp = async (email: string, username: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await AuthService.signUp({ email, username, password });
      setCurrentUser(jwtDecode(data.accessToken));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await AuthService.logOut();
      setCurrentUser(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const refresh = async () => {
    try {
      setLoading(true);
      const { data } = await AuthService.refresh();
      setCurrentUser(jwtDecode(data.accessToken));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, error, loading, logIn, signUp, logOut, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
