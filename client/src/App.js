import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Logout from './pages/Logout';
import useRefreshToken from './hooks/useRefreshToken';

function App() {
	const refresh = useRefreshToken();
	useEffect(() => {
		refresh();
	}, []);

	return (
		<div>
			{/* Routes to page content */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/logout" element={<Logout />} />


				{/* Need to login before can access */}
				<Route element={<RequireAuth />}>{/* Add routes here */}</Route>

				{/* Not found page */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
