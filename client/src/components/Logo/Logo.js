import { Link } from 'react-router-dom';
import cx from 'classnames';

function Logo() {
	return (
		<div
			className={cx(
				'inline-block overflow-hidden rounded',
				`h-[60px] aspect-square`
			)}
		>
			<Link to="/">
				<img
					className="h-full scale-150"
					src="https://t4.ftcdn.net/jpg/04/06/98/77/360_F_406987733_1e07OKnGxudkdq1xMqi1jIqZEzdZkceb.jpg"
				/>
			</Link>
		</div>
	);
}

export default Logo;
