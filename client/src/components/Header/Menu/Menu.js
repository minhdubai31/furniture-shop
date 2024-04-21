import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';
import { useEffect, useState } from 'react';

function Menu() {
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	const { getCategories } = CategoryService();
	const { getBrands } = BrandService();

	const fetchCategories = async () => {
		try {
			setCategories(await getCategories());
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

	useEffect(() => {
		fetchCategories();
		fetchBrands();
	}, []);

	const menu = [
		{ label: 'Trang chủ', link: '/' },
		{
			label: 'Sản phẩm',
			link: '/products',
			children: categories.map((category) => {
				return {
					item: category,
					type: "category",
					text: category.name,
				};
			}),
		},
		{
			label: 'Thương hiệu',
			link: '/brands',
			children: brands.map((brand) => {
				return {
					item: brand,
					type: "brand",
					text: brand.name,
				};
			}),
		},
	];
	return (
		<div>
			<ul className="flex gap-10">
				{menu.map((item, index) => {
					return !item.children ? (
						<Link
							key={index}
							to={item.link}
							className="hover:text-[#ffc83a] duration-200"
						>
							{item.label}
						</Link>
					) : (
						<DropDown
							key={index}
							label={item.label}
							link={item.link}
							children={item.children}
						/>
					);
				})}
			</ul>
		</div>
	);
}

export default Menu;
