import SearchBar from './Searchbar';
import Menu from './Menu';
import Logo from '../Logo';
import User from './User';
import AdminMenuBar from './AdminMenuBar';

import useAuth from '../../hooks/useAuth';
import { useRef } from 'react';

function Header() {
	const { auth } = useAuth();
	const header = useRef();

	return (
		<div>

			{/* AdminMenuBar reservations */}
			{auth?.role == 'ADMIN' && <div className='h-8 bg-black'></div>}

			{/* Header reservations */}
			<div className={'h-20 bg-[#333]'}></div>

			{/* Real header */}
			<div ref={header} className="z-10 top-0 fixed w-full">
				{/* AdminMenuBar */}
				{auth?.role == 'ADMIN' && <AdminMenuBar />}

				<div className="bg-[#333]/85 backdrop-blur h-20 flex justify-center text-gray-200">
					<div className="w-[1280px] px-4 flex justify-between items-center">
						<div className="flex items-center gap-16 h-full">
							<Logo />
							<Menu />
						</div>
						<div className="flex gap-10">
							<SearchBar />
							<User />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
