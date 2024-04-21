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
					if (localStorage.getItem('essayAccessToken')) {
						config.headers[
							'Authorization'
						] = `Bearer ${localStorage.getItem(
							'essayAccessToken'
						)}`;
					}
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error.config;
				if (error.response.status == 403 && prevRequest.sent == false) {
					prevRequest.sent = true;

					if (!isRefreshed) {
						isRefreshed = true;
						try {
							await refreshToken();

							prevRequest.headers[
								'Authorization'
							] = `Bearer ${localStorage.getItem(
								'essayAccessToken'
							)}`;

							return axios(prevRequest);
						} catch (error) {
							return Promise.reject(error);
						}
					}
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
