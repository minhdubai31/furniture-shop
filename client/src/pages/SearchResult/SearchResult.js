import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import DecoratedHeading from '../../components/DecoratedHeading';
import ProductCard from '../../components/ProductCard';

function SearchResult() {
	const { findProductsByName } = ProductService();
	const [searchParams, setSearchParams] = useSearchParams();
	const [resultProducts, setResultProducts] = useState([]);

	const findProductsHandler = async (name) => {
		try {
			setResultProducts(await findProductsByName(name));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		findProductsHandler(searchParams.get('text'));
	}, [searchParams.get('text')]);
	return (
		<div className="bg-gray-100 py-8">
			<div className="w-[1280px] m-auto bg-white border rounded-md">
				<div className="my-8">
					<DecoratedHeading content="Kết quả tìm kiếm" />
				</div>

				{/* Products list */}
				<div className="w-full grid grid-cols-5 gap-1 px-12 pb-12">
					{resultProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				{resultProducts.length == 0 && <div className="w-full h-44 text-center pt-6">
               Không tìm thấy sản phẩm bạn yêu cầu
            </div>}
			</div>
		</div>
	);
}

export default SearchResult;
