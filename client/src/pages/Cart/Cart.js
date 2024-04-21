import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import CartTable from '../../components/CartTable';
import DecoratedHeading from '../../components/DecoratedHeading';

import DeleteButton from '../../components/DeleteButton';

import CartService from '../../services/CartService';
import UserService from '../../services/UserService';
import CartContext from '../../context/CartProvider';

function Cart() {
	const { getUser } = UserService();
	const { updateCart } = CartService();
	const { setCartNumber } = useContext(CartContext);

	const location = useLocation();
	const [cartItems, setCartItems] = useState([]);

	const getUserCartHandler = async (id) => {
		try {
			const user = await getUser(id);
			setCartItems(user.cart);
		} catch (error) {
			console.log(error);
		}
	};

	const updateCartHandler = useDebouncedCallback(
		async (productId, amount) => {
			try {
				setCartNumber();
				await updateCart(productId, amount);
			} catch (error) {
				console.log(error);
			}
		},
		500
	);

	const deleteProductCartHandler = async (productId) => {
		try {
			setCartNumber(0);
			setCartItems((prev) =>
				prev.filter((item) => item.product.id != productId)
			);
			await updateCart(productId, 0);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		document.title = 'Giỏ hàng';
		getUserCartHandler(location.state.id);
	}, []);

	const tableColumns = [
		{
			label: 'Sản phẩm',
			renderCell: (item) => (
				<div>
					<span>
						<img loading="lazy"
							className="inline-block h-16 w-16 object-cover rounded me-5"
							src={
								process.env.REACT_APP_BACKEND_SERVER +
								item.product.image.thumbnailPath
							}
						/>
					</span>
					<span>{item.product?.name}</span>
				</div>
			),
		},
		{
			label: 'Đơn giá',
			renderCell: (item) => (
				<div>
					{item.product?.salePrice && (
						<p className="ms-1 mt-2 line-through text-xs text-gray-500 leading-tight">
							{item.product.price?.toLocaleString('vi-VN')}đ
						</p>
					)}
					<p className="ms-1 font-bold leading-tight">
						{item.product?.salePrice
							? item.product.salePrice?.toLocaleString('vi-VN')
							: item.product.price?.toLocaleString('vi-VN')}
						đ
					</p>
				</div>
			),
		},
		{
			label: 'Số lượng',
			renderCell: (item) => (
				<div
					className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg"
					data-hs-input-number=""
				>
					<div className="flex items-center gap-x-1.5">
						<button
							type="button"
							onClick={(e) => {
								if (e.target.nextSibling.innerHTML > 1) {
									let amount = --e.target.nextSibling
										.innerHTML;
									item.amount = amount;
									updateCartHandler(item.product.id, amount);
								}
							}}
							className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						>
							<svg
								className="flex-shrink-0 size-3.5"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14"></path>
							</svg>
						</button>
						<span className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center">
							{item.amount}
						</span>
						<button
							type="button"
							onClick={(e) => {
								if (
									e.target.previousSibling.innerHTML <
									item.product.remainingAmount
								) {
									let amount = ++e.target.previousSibling
										.innerHTML;
									item.amount = amount;
									updateCartHandler(item.product.id, amount);
								}
							}}
							className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						>
							<svg
								className="flex-shrink-0 size-3.5"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14"></path>
								<path d="M12 5v14"></path>
							</svg>
						</button>
					</div>
				</div>
			),
		},
		{
			label: 'Thành tiền',
			renderCell: (item) => (
				<div>
					<p className="ms-1 font-bold leading-tight">
						{item.product?.salePrice
							? (
									item.product.salePrice * item.amount
							  )?.toLocaleString('vi-VN')
							: (
									item.product.price * item.amount
							  )?.toLocaleString('vi-VN')}
						đ
					</p>
				</div>
			),
		},
		{
			renderCell: (item) => (
				<DeleteButton
					item={item.product}
               description='Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?'
					deletefn={deleteProductCartHandler}
				/>
			),
		},
	];
	return (
		<div className="bg-gray-100 py-5">
			<div className="w-[1280px] m-auto bg-white border rounded-md p-12">
				<DecoratedHeading content="Giỏ hàng của bạn" />
				<div className="mb-10"></div>
				{cartItems?.length > 0 && (
					<CartTable
						tableData={cartItems}
						tableColums={tableColumns}
						templateCol="minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto"
					/>
				)}
            {cartItems?.length === 0 && (
                <div className="w-full h-80 flex justify-center items-center">
                   <p>Có vẻ ở đây hơi trống trãi. Hãy tiếp tục mua sắm nhé!</p>
                </div>
            )}
			</div>
		</div>
	);
}

export default Cart;
