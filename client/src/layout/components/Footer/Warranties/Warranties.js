import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPhone,
	faCreditCard,
	faTruckFast,
	faAward,
} from '@fortawesome/free-solid-svg-icons';

function Warranties() {
	const warranties = [
		{
			text: 'Thanh toán dễ dàng và bảo mật',
			icon: faCreditCard,
		},
		{
			text: 'Giao hàng đảm bảo toàn quốc',
			icon: faTruckFast,
		},
		{
			text: 'Cam kết sản phẩm chính hãng',
			icon: faAward,
		},
		{
			text: 'Hotline 0123456789',
			icon: faPhone,
		},
	];

	return (
		<div className="grid grid-cols-4">
			{warranties.map((warranty, index) => (
				<div
					key={index}
					className="bg-white col-auto text-center border py-12 font-[Quicksand] font-medium uppercase"
				>
					<FontAwesomeIcon
						icon={warranty.icon}
						className="text-4xl text-black mb-4"
					/>
					<p className="mt-4 text-sm">{warranty.text}</p>
				</div>
			))}
		</div>
	);
}

export default Warranties;
