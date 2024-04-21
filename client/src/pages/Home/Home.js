import { useEffect, useState } from 'react';

import Banner from '../../components/Banner';
import OutStandingCategories from './OutStandingCategories';
import DecoratedHeading from '../../components/DecoratedHeading';
import ProductCard from '../../components/ProductCard';
import ProductService from '../../services/ProductService';
import banner1 from '../../assets/bg1.jpg'

function Home() {
	const { getProducts } = ProductService();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		document.title = 'Trang chủ';
		const fetchProducts = async () => {
			try {
				setProducts(await getProducts());
			} catch (error) {}
		};

		fetchProducts();
	}, []);
	return (
		<div>
			<Banner imgSrc={banner1} />
			<div className="bg-gray-100 py-8">
				<OutStandingCategories />
				<div className="w-[1280px] m-auto bg-white border rounded-md">
					<div className="my-8">
						<DecoratedHeading content="Sản phẩm nổi bật" />
					</div>
					<div className="grid grid-cols-5 w-[1280px] m-auto p-6">
						{products.slice(0, 5).map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
