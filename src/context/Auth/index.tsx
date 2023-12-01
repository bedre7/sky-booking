import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "./types";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(user);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setCurrentUser(user);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, error, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
