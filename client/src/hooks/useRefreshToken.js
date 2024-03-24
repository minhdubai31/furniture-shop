import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from './useAuth';

const REFRESH_TOKEN_URL = '/api/auth/refreshtoken';

const useRefreshToken = () => {
	const { setAuth } = useAuth();
	const navigate = useNavigate();

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

			setAuth({ name, role });

			localStorage.setItem('essayAccessToken', newAccessToken);
			console.log('refresh');
		} catch (error) {
			console.log(error);
			navigate('/logout');
		}
	};
	return refreshToken;
};

export default useRefreshToken;
