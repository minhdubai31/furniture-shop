import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function User() {
	return (
		<div className="flex items-center gap-5">
			<a className="text-lg me-4" href="">
				<FontAwesomeIcon icon={faBagShopping} />
			</a>
			{/* <a href="">
				<FontAwesomeIcon icon={faUser} />
			</a> */}
			{/* Sign up */}
			<Link
				to="/users/signup"
				className="text-white/50 hover:text-white duration-200"
			>
				Sign up
			</Link>

			{/* Login */}
			<Link
				to="/users/login"
				className="p-2 px-3 rounded-md text-white hover:bg-white hover:text-black duration-200 border border-white/50"
			>
				Login
			</Link>
		</div>
	);
}

export default User;
