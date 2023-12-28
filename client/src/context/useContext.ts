import axios from "axios";
import { useState } from "react";

export const useContextData = () => {
  const [isAuthenticated, setAuthenticates] = useState<boolean>(false);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    isAuthenticated,
    setAuthenticates,
    axiosInstance,
  };
};
