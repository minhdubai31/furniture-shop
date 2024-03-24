import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import axios from '../api/axios';

function useAxios() {
	const refreshToken = useRefreshToken();

	useEffect(() => {
		let isRefreshed = false;

		const requestIntercept = axios.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers[
						'Authorization'
					] = `Bearer ${localStorage.getItem('essayAccessToken')}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error.config;
				console.log(prevRequest)
				if (error.response.status == 403 && !prevRequest.sent) {
					prevRequest.sent = true;

					if (!isRefreshed) {
						isRefreshed = true;
						try {
							await refreshToken();
						}
						catch (error) {
							return Promise.reject(error);
						}
					}

					prevRequest.headers[
						'Authorization'
					] = `Bearer ${localStorage.getItem('essayAccessToken')}`;

					return axios(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.request.eject(requestIntercept);
			axios.interceptors.response.eject(responseIntercept);
		};
	}, []);

	return axios;
}

export default useAxios;
