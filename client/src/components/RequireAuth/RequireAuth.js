import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import NoPermissionPage from '../../pages/NoPermission';

const RequireAuth = ({ allowedRole }) => {
	const { auth } = useAuth();
	const location = useLocation();

	return allowedRole ? (
		auth?.role == allowedRole ? (
			<Outlet />
		) : (
			<NoPermissionPage />
		)
	) : auth?.name ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
