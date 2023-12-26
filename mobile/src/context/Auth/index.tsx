import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { IUser } from "./types";
import ApiClient from "../../api";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

interface IAuthContext {
  accessToken: string;
  currentUser: IUser | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, username: string) => void;
  logout: () => void;
  refresh: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  accessToken: "",
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
  const [accessToken, setAccessToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await ApiClient.post("auth/login", {
        email,
        password,
      });
      setAccessToken(data.accessToken);
      setCurrentUser(jwtDecode(data.accessToken));
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
      setError(null);
      const { data } = await ApiClient.post("/auth/signup", {
        email,
        username,
        password,
      });
      setAccessToken(data.accessToken);
      setCurrentUser(jwtDecode(data.accessToken));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await ApiClient.post("/auth/logout");
      setAccessToken("");
      setCurrentUser(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await ApiClient.post("/auth/refresh");
      setAccessToken(data.accessToken);
      setCurrentUser(jwtDecode(data.accessToken));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        currentUser,
        error,
        loading,
        login,
        signup,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
