import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const SIGNUP_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/authenticate';

function AuthService() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const login = async (username, password) => {
		const response = await axios.post(
			LOGIN_URL,
			JSON.stringify({ username, password }),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const accessToken = response?.data?.token;
		const refreshToken = response?.data?.refresh_token;
		const role = response?.data?.role;
		const name = response?.data?.name;
		const id = response?.data?.id;

		localStorage.setItem('essayAccessToken', accessToken);
		localStorage.setItem('essayRefreshToken', refreshToken);

		setAuth({ id, name, username, role });
		navigate('/');
	};

	const register = async (name, username, email, password) => {
		const response = await axios.post(
			SIGNUP_URL,
			JSON.stringify({
				name,
				username,
				email,
				password,
			})
		);

		const accessToken = response?.data?.token;
		const refreshToken = response?.data?.refresh_token;
		const role = response?.data?.role;
		const id = response?.data?.id;

		localStorage.setItem('essayAccessToken', accessToken);
		localStorage.setItem('essayRefreshToken', refreshToken);

		setAuth({ id, name, username, role });
		navigate('/');
	};

	return { login, register };
}

export default AuthService;
