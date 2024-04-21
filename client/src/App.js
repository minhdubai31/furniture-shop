import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from './pages/PublicLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import OAuth2Redirect from './pages/OAuth2Redirect';
import ProductDetail from './pages/ProductDetail';
import SearchResult from './pages/SearchResult';
import Brands from './pages/Brands';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Payment from './pages/Payment';

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
				<Route path="/" element={<PublicLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route
						path="/products/:productId"
						element={<ProductDetail />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/oauth2" element={<OAuth2Redirect />} />
					<Route path="/search" element={<SearchResult />} />
					<Route path="/brands" element={<Brands />} />

					{/* Need to login before can access */}
					<Route element={<RequireAuth />}>
						{/* Add routes here */}
						<Route path="/cart" element={<Cart />} />
						<Route path="/order" element={<Order />} />
						<Route path='/payment' element={<Payment />} />
					</Route>
				</Route>

				{/* Need to be ADMIN to access */}
				<Route element={<RequireAuth allowedRole="ADMIN" />}>
					{/* Add routes here */}
					<Route path="/admin" element={<Admin />} />
				</Route>

				{/* Not found page */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
