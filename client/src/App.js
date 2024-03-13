import { Routes, Route } from 'react-router-dom';

import Header from './layout/components/Header';
import Footer from './layout/components/Footer';

import Home from './layout/pages/Home';
import Products from './layout/pages/Products';
import Login from './layout/pages/Login';
import SignUp from './layout/pages/SignUp';


function App() {
	return (
		<div>
			<Header />

			{/* Routes to page content */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/users/login" element={<Login />} />
				<Route path="/users/signup" element={<SignUp />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
