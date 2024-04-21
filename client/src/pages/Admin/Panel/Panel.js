import { useEffect, useState } from 'react';
import cx from 'classnames';
import Logo from '../../../components/Logo';
import UserPanel from './UserPanel';
import BrandPanel from './BrandPanel';
import MediaPanel from './MediaPanel';
import CategoryPanel from './CategoryPanel';
import ProductPanel from './ProductPanel';
import OrderPanel from './OrderPanel';

const panelChildren = [
	{ label: 'Người dùng', body: <UserPanel /> },
	{ label: 'Thương hiệu', body: <BrandPanel /> },
	{ label: 'Danh mục', body: <CategoryPanel /> },
	{ label: 'Sản phẩm', body: <ProductPanel /> },
	{ label: 'Đơn hàng', body: <OrderPanel /> },
	{ label: 'Media', body: <MediaPanel /> },
];

function Panel({ setActiveTab }) {
	const [tab, setTab] = useState(panelChildren[0]);

	useEffect(() => {
		setActiveTab(tab.body);
	}, []);

	return (
		<div className="bg-zinc-700 text-white h-full">
			<ul className="leading-10 p-2">
				<div className="text-center my-5 mb-8">
					<Logo />
					<div className="uppercase font-bold">Admin panel</div>
				</div>
				{panelChildren.map((child, index) => (
					<li
						key={index}
						onClick={() => {
							setTab(child);
							setActiveTab(child.body);
						}}
						className={cx(
							'cursor-pointer px-3 my-1 rounded duration-150',
							child == tab
								? 'bg-yellow-500 text-black'
								: 'hover:bg-white/5'
						)}
					>
						{child.label}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Panel;
