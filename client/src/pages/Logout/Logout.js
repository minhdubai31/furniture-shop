import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Logout() {
	const { setAuth } = useAuth();

	localStorage.removeItem('essayAccessToken');
	localStorage.removeItem('essayRefreshToken');

	setAuth(null);

	return (
		<Navigate to="/" replace />
	)
}

export default Logout;
