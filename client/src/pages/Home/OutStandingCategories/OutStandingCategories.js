import classNames from 'classnames/bind';
import styles from './CategoriesGridView.module.scss';
import DecoratedHeading from '../../../components/DecoratedHeading';
import CategoryService from '../../../services/CategoryService';
import { useEffect, useState } from 'react';

import categorybg1 from '../../../assets/category_bg1.jpg';
import categorybg2 from '../../../assets/category_bg2.jpg';
import categorybg3 from '../../../assets/category_bg3.jpg';
import categorybg4 from '../../../assets/category_bg4.jpg';
import categorybg5 from '../../../assets/category_bg5.jpg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function OutStandingCategories() {
	const { getCategories } = CategoryService();
	// get images
	const [categories, setCategories] = useState([]);

	const categoriesbg = [
		categorybg1,
		categorybg2,
		categorybg3,
		categorybg4,
		categorybg5,
	];

	const fetchCategories = async () => {
		try {
			setCategories(await getCategories());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="bg-white mb-8 py-6 border-y">
			{/* Heading */}
			<DecoratedHeading content="Danh mục nổi bật" />

			{/* Grid view */}
			<div className={cx('categories-grid-container', 'mt-8')}>
				{categories.slice(0, 5).map((category, index) => (
					<Link
						key={index}
						className={cx('image-box')}
						state={{ selectedCategory: [category] }}
						to={'/products'}
						onClick={() =>
							window.location.href.includes('products') &&
							window.location.reload()
						}
					>
						<img loading="lazy"
							className="brightness-[60%] hover:brightness-100 duration-200"
							src={categoriesbg[index]}
						/>
						<span className="absolute text-center pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl uppercase font-[Roboto] font-bold text-white">
							{category.name}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}

export default OutStandingCategories;
