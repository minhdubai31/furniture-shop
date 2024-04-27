import { useState, useEffect } from 'react';

import DecoratedHeading from '../../components/DecoratedHeading';
import BrandService from '../../services/BrandService';
import nl2br from 'react-nl2br';

function Brands() {
	const { getBrands } = BrandService();
	const [brands, setBrands] = useState([]);

	const fetchBrands = async () => {
		try {
			setBrands(await getBrands());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		document.title = 'Thương hiệu';
		fetchBrands();
	}, []);

	return (
		<div className="bg-gray-100 py-8">
			<div className="w-[1280px] m-auto bg-white border rounded-md">
				<div className="my-8">
					<DecoratedHeading content="Các thương hiệu liên kết với chúng tôi" />
				</div>

				{/* Products list */}
				<div className="w-full grid grid-cols-3 gap-2 px-12 pb-12">
					{brands.map((brand) => (
						<div className='rounded-md flex flex-col items-center bg-black/5 p-5 px-10'>
                     <img loading="lazy" className='h-36 object-contain' src={process.env.REACT_APP_BACKEND_SERVER + brand.logo.path} />
                     <h5 className='text-xl font-bold upper mt-5'>{brand.name}</h5>
                     <p className='w-full text-sm mt-2'>{nl2br(brand.description)}</p>
                  </div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Brands;
