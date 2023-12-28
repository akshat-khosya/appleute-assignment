import { AxiosInstance } from "axios";
import { createContext } from "react";

interface GlobalContextValue {
  isAuthenticated: boolean;
  setAuthenticates: (auth: boolean) => void;
  axiosInstance: AxiosInstance;
}
const GlobalContext = createContext<GlobalContextValue>({
  isAuthenticated: false,
  setAuthenticates: () => {},
  axiosInstance: {} as AxiosInstance,
});

export default GlobalContext;
