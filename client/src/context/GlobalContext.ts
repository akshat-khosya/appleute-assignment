import { createContext } from "react";
import { IProductCard } from "../pages/Dashboard";

interface GlobalContextValue {
	isAuthenticated: boolean;
	setAuthenticated: (auth: boolean) => void;
	cart: IProductCard[];
	setCart: (_: IProductCard[]) => void;
}
const GlobalContext = createContext<GlobalContextValue>({
	isAuthenticated: false,
	setAuthenticated: () => { },
	cart: [],
	setCart: () => { },
});

export default GlobalContext;
