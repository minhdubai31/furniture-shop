import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import useAuth from '../../../hooks/useAuth';

function User() {
	const { auth } = useAuth();

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
						<Link className="text-lg me-4" to="">
							<FontAwesomeIcon icon={faBagShopping} />
						</Link>
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
										to={'/logout'}
										className="text-gray-500 hover:text-black duration-300"
									>
										Đăng xuất
									</Link>
								</div>
							}
						>
							<Link
								to="/"
								className="text-white/50 hover:text-white duration-200"
							>
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
