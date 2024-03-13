import { Link } from 'react-router-dom';
import DropDown from './DropDown';

function Menu() {
	const menu = [
		{ label: 'Trang chủ', link: '/' },
		{
			label: 'Sản phẩm',
			link: '/products',
			children: [
				{
					text: 'Sản phẩm 1',
					link: '/products/1',
				},
				{
					text: 'Sản phẩm 2',
					link: '/products/2',
				},
				{
					text: 'Bàn đầu giường',
					link: '/products/3',
				},
				{
					text: 'Sản phẩm 4',
					link: '/products/4',
				},
				{
					text: 'Sản phẩm 1',
					link: '/products/1',
				},
				{
					text: 'Sản phẩm 2',
					link: '/products/2',
				},
				{
					text: 'Bàn đầu giường',
					link: '/products/3',
				},
				{
					text: 'Sản phẩm 4',
					link: '/products/4',
				},
				{
					text: 'Sản phẩm 4',
					link: '/products/4',
				},
			],
		},
		{ label: 'Phòng', link: '/rooms' },
		{ label: 'Bộ sưu tập', link: '/collections' },
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
