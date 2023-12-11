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
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  error: null,
  loading: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("logging in");
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

  const signup = async (email: string, username: string, password: string) => {
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

  const logout = async () => {
    setCurrentUser(null);
    setError(null);
    await AuthService.logOut();
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, error, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
