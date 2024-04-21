import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Banner from '../../components/Banner';
import DecoratedHeading from '../../components/DecoratedHeading';
import ProductCard from '../../components/ProductCard/ProductCard';

import ProductService from '../../services/ProductService';
import BrandService from '../../services/BrandService';
import CategoryService from '../../services/CategoryService';

import banner2 from '../../assets/bg2.jpg';

function Product() {
	const location = useLocation();

	const { getProducts } = ProductService();
	const { getBrands } = BrandService();
	const { getCategories } = CategoryService();

	const [products, setProducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [categories, setCategories] = useState([]);

	const [selectedBrands, setSelectedBrands] = useState(
		location.state?.selectedBrand ?? []
	);
	const [selectedCategories, setSelectedCategories] = useState(
		location.state?.selectedCategory ?? []
	);

	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState('');

	useEffect(() => {
		document.title = 'Sản phẩm';

		const fetchProducts = async () => {
			try {
				setProducts(await getProducts());
			} catch (error) {
				console.log(error);
			}
		};

		const fetchBrands = async () => {
			try {
				setBrands(await getBrands());
			} catch (error) {
				console.log(error);
			}
		};

		const fetchCategories = async () => {
			try {
				setCategories(await getCategories());
			} catch (error) {
				console.log(error);
			}
		};

		products.length == 0 && fetchProducts();
		brands.length == 0 && fetchBrands();
		categories.length == 0 && fetchCategories();
	}, [selectedBrands, selectedCategories]);

	return (
		<div>
			<Banner imgSrc={banner2} />
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
							<div className="mt-5">
								<p className="font-semibold">Mức giá</p>
								<p className="text-xs">Từ</p>
								<input
									className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									type="number"
									min={0}
									value={minPrice}
									onChange={(e) =>
										setMinPrice(e.target.value)
									}
								/>
								<p className="text-xs">đến</p>
								<input
									className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									type="number"
									min={0}
									value={maxPrice}
									onChange={(e) =>
										setMaxPrice(e.target.value)
									}
								/>
							</div>
							<div className="mt-5">
								<p className="font-semibold">Thương hiệu</p>
								{brands &&
									brands.map((brand) => (
										<div key={brand.id}>
											<input
												type="checkbox"
												name="selected-brands"
												checked={
													selectedBrands.filter(
														(item) =>
															item.id == brand.id
													).length > 0
												}
												onChange={(e) => {
													if (
														selectedBrands.filter(
															(item) =>
																item.id ==
																brand.id
														).length > 0
													) {
														setSelectedBrands(
															(prev) =>
																prev.filter(
																	(item) =>
																		item.id !=
																		brand.id
																)
														);
													} else {
														setSelectedBrands(
															(prev) => [
																...prev,
																brand,
															]
														);
													}
												}}
											/>
											<label className="text-xs ms-2">
												{brand.name}
											</label>
										</div>
									))}
							</div>
							<div className="mt-5">
								<p className="font-semibold">Danh mục</p>
								{categories &&
									categories.map((category) => (
										<div key={category.id}>
											<input
												type="checkbox"
												name="selected-categories"
												checked={
													selectedCategories.filter(
														(item) =>
															item.id ==
															category.id
													).length > 0
												}
												onChange={(e) => {
													if (
														selectedCategories.filter(
															(item) =>
																item.id ==
																category.id
														).length > 0
													) {
														setSelectedCategories(
															(prev) =>
																prev.filter(
																	(item) =>
																		item.id !=
																		category.id
																)
														);
													} else {
														setSelectedCategories(
															(prev) => [
																...prev,
																category,
															]
														);
													}
												}}
											/>
											<label className="text-xs ms-2">
												{category.name}
											</label>
										</div>
									))}
							</div>
						</div>

						{/* Products list */}
						<div className="w-full grid grid-cols-4 gap-1">
							{products
								.filter((product) => {
									let price =
										product.salePrice ?? product.price;
									let max = maxPrice
										? maxPrice
										: 99999999999999;
									let isMinThan = price >= minPrice;
									let isMaxThan = price <= max;

									if (
										selectedBrands.length == 0 &&
										selectedCategories.length == 0
									) {
										return isMaxThan && isMinThan;
									}

									if (selectedCategories.length == 0) {
										return (
											selectedBrands.filter(
												(brand) =>
													brand?.id ==
													product?.brand?.id
											).length > 0 &&
											isMaxThan &&
											isMinThan
										);
									}

									if (selectedBrands.length == 0) {
										return (
											selectedCategories.filter(
												(category) =>
													category?.id ==
													product?.category?.id
											).length > 0 &&
											isMaxThan &&
											isMinThan
										);
									}

									return (
										selectedBrands.filter(
											(brand) =>
												brand?.id == product?.brand?.id
										).length > 0 &&
										selectedCategories.filter(
											(category) =>
												category?.id ==
												product?.category?.id
										).length > 0 &&
										isMaxThan &&
										isMinThan
									);
								})
								.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Product;
