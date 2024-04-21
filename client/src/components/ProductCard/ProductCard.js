import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductCard.module.scss';
import classNames from 'classnames/bind';

import CartService from '../../services/CartService';
import CartContext from '../../context/CartProvider';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function ProductCard({ product }) {
	const { updateCart } = CartService();
	const { setCartNumber } = useContext(CartContext);

	const addToCartHandler = async (productId, amount) => {
		try {
			setCartNumber(prev => ++prev);
			await updateCart(productId, amount, false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div
				className={cx(
					'product-card-container',
					'h-full p-4 pb-[4rem] rounded-lg border border-transparent relative hover:border-gray-300 duration-200'
				)}
			>
				<Link to={`/products/${product.id}`} state={product}>
					<img loading="lazy"
						className="aspect-square rounded-md w-full object-cover border"
						src={
							product.image &&
							process.env.REACT_APP_BACKEND_SERVER +
								product.image?.thumbnailPath
						}
						alt={product.name}
					/>
					<h3 className="ms-1 leading-tight mt-1">{product.name}</h3>
				</Link>
				{product?.salePrice && (
					<p className="ms-1 mt-2 line-through text-xs text-gray-500 leading-tight">
						{product.price?.toLocaleString('vi-VN')}đ
					</p>
				)}
				<p className="ms-1 font-bold leading-tight">
					{product?.salePrice
						? product.salePrice?.toLocaleString('vi-VN')
						: product.price?.toLocaleString('vi-VN')}
					đ
				</p>
				<div
					className={cx(
						'product-card-footer',
						'px-4 -mt-2 w-full flex gap-2 justify-between invisible absolute left-1/2 -translate-x-1/2 bottom-4 duration-200 opacity-0'
					)}
				>
					<button
						onClick={(e) => addToCartHandler(product.id, 1)}
						className="p-2 px-8 rounded-md  text-black hover:bg-black hover:text-white duration-150 border border-gray-500"
					>
						<FontAwesomeIcon icon={faCartPlus} />
					</button>
					<Link
						to={`/products/${product.id}`}
						state={product}
						className="flex-grow text-center p-2 rounded-md bg-black text-white border border-zinc-800 hover:bg-zinc-600 duration-150"
					>
						Xem thêm
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
