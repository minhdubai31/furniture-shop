import { Link } from 'react-router-dom';

function Logo( { size } ) {
	return (
		<Link to="/" className="h-[60px] w-[60px] inline-block overflow-hidden rounded">
			<img
				className="h-full scale-150"
				src="https://t4.ftcdn.net/jpg/04/06/98/77/360_F_406987733_1e07OKnGxudkdq1xMqi1jIqZEzdZkceb.jpg"
			/>
		</Link>
	);
}

export default Logo;
