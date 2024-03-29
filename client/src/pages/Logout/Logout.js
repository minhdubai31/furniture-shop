import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';

function Logout() {
	const { setAuth } = useAuth();
	useEffect(() => {
		setAuth(null);
	}, []);

	localStorage.removeItem('essayAccessToken');
	localStorage.removeItem('essayRefreshToken');

	return <Navigate to="/" replace />;
}

export default Logout;
