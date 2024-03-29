import axios from '../api/axios';
import useAuth from './useAuth';

const REFRESH_TOKEN_URL = '/api/auth/refreshtoken';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refreshToken = async () => {
		try {
			const response = await axios.post(REFRESH_TOKEN_URL, null, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						'essayRefreshToken'
					)}`,
				},
			});

			const newAccessToken = response?.data?.token;
			const role = response?.data?.role;
			const name = response?.data?.name;
			const username = response?.data?.username;

			setAuth({ name, role, username });

			localStorage.setItem('essayAccessToken', newAccessToken);
		} catch (error) {
			console.log(error);

			setAuth(null);
			localStorage.removeItem('essayAccessToken');
			localStorage.removeItem('essayRefreshToken');
		}
	};
	return refreshToken;
};

export default useRefreshToken;
