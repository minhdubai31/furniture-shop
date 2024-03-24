import classNames from 'classnames/bind';
import styles from './CategoriesGridView.module.scss';
import DecoratedHeading from '../../../components/DecoratedHeading';

const cx = classNames.bind(styles);

function OutStandingCategories() {
	// get images
	const categories = [
		{
			image: 'https://www.thespruce.com/thmb/P4hBQtEPZVrrWPdbtXy7-wv9fiE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1161177015-f1de4ba58a6c4f50969d9119d80405a6.jpg',
			text: 'Sofa',
			link: '/products',
		},
		{
			image: 'https://foyr.com/learn/wp-content/uploads/2021/10/rules-for-interior-designers-1024x656.png',
			text: 'Sofa',
			link: '/products',
		},
		{
			image: 'https://www.thespruce.com/thmb/P4hBQtEPZVrrWPdbtXy7-wv9fiE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1161177015-f1de4ba58a6c4f50969d9119d80405a6.jpg',
			text: 'Sofa',
			link: '/products',
		},
		{
			image: 'https://www.thespruce.com/thmb/P4hBQtEPZVrrWPdbtXy7-wv9fiE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1161177015-f1de4ba58a6c4f50969d9119d80405a6.jpg',
			text: 'Sofa',
			link: '/products',
		},
		{
			image: 'https://www.thespruce.com/thmb/P4hBQtEPZVrrWPdbtXy7-wv9fiE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1161177015-f1de4ba58a6c4f50969d9119d80405a6.jpg',
			text: 'Sofa',
			link: '/products',
		},
	];

	return (
		<div className="my-8 bg-white">
			{/* Heading */}
			<DecoratedHeading content="Danh mục nổi bật" />

			{/* Grid view */}
			<div className={cx('categories-grid-container', 'mt-8')}>
				{categories.map((category, index) => (
					<div key={index} className={cx('image-box')}>
						<img
							className="brightness-[60%] hover:brightness-100 duration-200"
							src={category.image}
						/>
						<span className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl uppercase font-[Roboto] font-bold text-white">
							{category.text}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default OutStandingCategories;
