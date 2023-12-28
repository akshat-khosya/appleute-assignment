import axios from "axios";
import { backendBaseUrl } from "../constants";

const http = axios.create({
	baseURL: backendBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
});

// ----------------------------------------------------------------
//                     Default Axios with Token
// ----------------------------------------------------------------
http.interceptors.request.use(
	async function (Config) {
		const config = Config;
		const token = localStorage.getItem("token");
		try {
			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
			return config;
		} catch (err) {
			return config;
		}
	},
	function (error: Error) {
		return Promise.reject(error);
	}
);

export default http;
