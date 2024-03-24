import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import DecoratedHeading from '../../components/DecoratedHeading';
import ProductCard from '../../components/ProductCard/ProductCard';

import useAxios from '../../hooks/useAxios';

const GET_PRODUCTS_URL = '/api/product/';

function Home() {
	const axios = useAxios();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		document.title = 'Sản phẩm';

		const fetchProducts = async () => {
			try {
				const response = await axios.get(GET_PRODUCTS_URL);
				setProducts(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProducts();
	}, []);

	// const products = [
	// 	{
	// 		name: 'San pham sieu cap tot',
	// 		image: 'https://res.cloudinary.com/dkqtxtobb/image/upload/f_auto,q_auto:best,w_768/product-assets/441332/room-and-board/sofas/sofa-beds/room-and-board-deco-convertible-sleeper-sofa.jpeg',
	// 		price: 1000,
	// 	},
	// 	{
	// 		name: 'San pham 2',
	// 		image: 'https://www.realsimple.com/thmb/kRRAaK6XhZIqL_GFIxfZzHTHx7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/furniture-styles-GettyImages-1467984982-512fed4077b646eabbc187619554d517.jpg',
	// 		price: 2000,
	// 	},
	// 	{
	// 		name: 'San pham sieu cap tot 2',
	// 		image: 'https://res.cloudinary.com/dkqtxtobb/image/upload/f_auto,q_auto:best,w_768/product-assets/441332/room-and-board/sofas/sofa-beds/room-and-board-deco-convertible-sleeper-sofa.jpeg',
	// 		price: 1000,
	// 	},
	// 	{
	// 		name: 'San pham sieu cap tot 3',
	// 		image: 'https://res.cloudinary.com/dkqtxtobb/image/upload/f_auto,q_auto:best,w_768/product-assets/441332/room-and-board/sofas/sofa-beds/room-and-board-deco-convertible-sleeper-sofa.jpeg',
	// 		price: 1000,
	// 	},
	// 	{
	// 		name: 'San pham sieu cap tot 4',
	// 		image: 'https://res.cloudinary.com/dkqtxtobb/image/upload/f_auto,q_auto:best,w_768/product-assets/441332/room-and-board/sofas/sofa-beds/room-and-board-deco-convertible-sleeper-sofa.jpeg',
	// 		price: 1000,
	// 	},
	// 	{
	// 		name: 'San pham sieu cap tot 5',
	// 		image: 'https://res.cloudinary.com/dkqtxtobb/image/upload/f_auto,q_auto:best,w_768/product-assets/441332/room-and-board/sofas/sofa-beds/room-and-board-deco-convertible-sleeper-sofa.jpeg',
	// 		price: 1000,
	// 	},
	// 	{
	// 		name: 'San pham sieu cap tot 6',
	// 		image: 'https://res.cloudinary.com/dkqtxtobb/image/upload/f_auto,q_auto:best,w_768/product-assets/441332/room-and-board/sofas/sofa-beds/room-and-board-deco-convertible-sleeper-sofa.jpeg',
	// 		price: 1000,
	// 	},
	// ];

	return (
		<div>
			<Header />
			<Banner imgSrc="https://www.decorpot.com/images/interior-designers-in-pune.jpg" />
			<div className="bg-gray-100 py-8">
				<div className="w-[1280px] m-auto bg-white border rounded-md">
					<div className="my-8">
						<DecoratedHeading content="Danh sách sản phẩm" />
					</div>
					<div className="flex gap-3 p-6">
						{/* Sidebar*/}
						<div className="w-64 h-fit">
							<h3 className="uppercase font-bold text-black/80">
								<FontAwesomeIcon
									icon={faFilter}
									className="me-2"
								/>
								Bộ lọc tìm kiếm
							</h3>
						</div>

						{/* Products list */}
						<div className="w-full grid grid-cols-4 gap-1">
							{products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
							{console.log(products)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
