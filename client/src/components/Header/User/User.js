import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useContext } from 'react';
import UserService from '../../../services/UserService';
import CartContext from '../../../context/CartProvider';

function User() {
	const { auth } = useAuth();
	const { getUser } = UserService();
	const { cartNumber, setCartNumber } = useContext(CartContext);

	const getUserHandler = async (id) => {
		if (auth)
			try {
				const user = await getUser(id);
				setCartNumber(
					user.cart?.reduce((prev, curr) => prev + curr?.amount, 0)
				);
			} catch (error) {
				console.log(error);
			}
	};

	useEffect(() => {
		getUserHandler(auth?.id);
	}, [auth]);

	return (
		<div className="flex items-center gap-5">
			{!auth && (
				<div className="flex gap-5 items-center">
					<Link
						to="/signup"
						className="text-white/50 hover:text-white duration-200"
					>
						Đăng ký
					</Link>

					{/* Login */}
					<Link
						to="/login"
						className="p-2 px-3 rounded-md text-white hover:bg-white hover:text-black duration-200 border border-white/50"
					>
						Đăng nhập
					</Link>
				</div>
			)}
			{auth && (
				<div>
					<div className="flex gap-2 items-center">
						<div className="relative">
							<Link
								className="text-lg me-4"
								to="/cart"
								state={auth}
							>
								<FontAwesomeIcon icon={faBagShopping} />
							</Link>

							<div className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[0.65rem] flex justify-center items-center">
								<span>{cartNumber}</span>
							</div>
						</div>
						<FontAwesomeIcon
							className="text-lg"
							icon={faUserCircle}
						/>
						<Tippy
							className="!text-base"
							placement="bottom"
							maxWidth="none"
							animation="shift-away"
							arrow={false}
							theme="light"
							interactive={true}
							interactiveDebounce={20}
							content={
								<div className="grid grid-flow-row auto-cols-max gap-y-4 gap-x-16 my-2 mx-3">
									<Link
										to={'/order'}
										className="text-gray-500 hover:text-black duration-300"
									>
										Đơn hàng của bạn
									</Link>
									<Link
										to={'/logout'}
										className="text-gray-500 hover:text-black duration-300"
									>
										Đăng xuất
									</Link>
								</div>
							}
						>
							<Link className="text-white/50 hover:text-white duration-200">
								{auth.name}
							</Link>
						</Tippy>
					</div>
				</div>
			)}
		</div>
	);
}

export default User;
