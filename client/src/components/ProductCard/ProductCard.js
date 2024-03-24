import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ProductCard({ product }) {
	return (
		<div>
			<div
				className={cx(
					'product-card-container',
					'h-full p-4 pb-[4.5rem] rounded-lg border border-transparent relative hover:border-gray-300 duration-200'
				)}
			>
				<Link to={`/products/${product.id}`}>
					<img
						className="aspect-square rounded-md w-full object-contain"
						src={product.image && process.env.REACT_APP_BACKEND_SERVER+product.image?.path}
						alt={product.name}
					/>
					<h3 className="">
						{product.name}
					</h3>
				</Link>
				<p className='mt-2 line-through text-xs text-gray-500'>{product.price.toLocaleString('vi-VN')}đ</p>
				<p className='font-bold'>{product.price.toLocaleString('vi-VN')}đ</p>
				<div
					className={cx(
						'product-card-footer',
						'px-4 pt-2 w-full flex justify-between invisible absolute left-1/2 -translate-x-1/2 bottom-4 duration-200 opacity-0'
					)}
				>
					<Link
						to={`/products/${product.id}`}
						className="p-2 rounded-md  text-black hover:bg-black hover:text-white duration-150 border border-gray-500"
					>
						Thêm vào giỏ
					</Link>
					<Link
						to={`/products/${product.id}`}
						className="p-2 rounded-md bg-black text-white border border-gray-500"
					>
						Xem thêm
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
