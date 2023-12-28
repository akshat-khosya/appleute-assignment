import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";
import { useContextData } from "./context/useContext";
import ScrollToTop from "./components/ScrollToTop";
import RoutesWrapper from "./pages/Routes";

function App() {
	const context = useContextData();
	return (
		<>
			<GlobalContext.Provider value={context}>
				<BrowserRouter>
					<ScrollToTop />
					<RoutesWrapper />
				</BrowserRouter>
			</GlobalContext.Provider>
		</>
	);
}

export default App;
