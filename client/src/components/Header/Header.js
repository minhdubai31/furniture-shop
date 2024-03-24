import SearchBar from './Searchbar';
import Menu from './Menu';
import Logo from './Logo';
import User from './User';

function Header() {
	return (
		<div>
			{/* Header reservations */}
			<div className="h-20 bg-[#333]"></div>

			{/* Real header */}
			<div className="bg-[#333]/85 backdrop-blur h-20 w-full z-10 top-0 flex fixed justify-center text-gray-200">
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
	);
}

export default Header;
