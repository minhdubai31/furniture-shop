import { ReactComponent as TRex } from '../../assets/t_rex.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function NotFound() {
	useEffect(() => {
		document.title = '404 Not Found';
	}, []);

	return (
		<div>
			<div className="flex justify-center items-center mt-[30vh]">
				<div className="grid grid-cols-5 items-center text-[#535353]">
					<div className="flex items-center">
						<TRex />
					</div>
					<div className="col-span-3 col-start-3">
						<p className="text-5xl">404</p>
						<p className="text-2xl">
							Opps! Có vẻ như trang này không tồn tại.
						</p>
						<button className="bg-[#535353] p-3 text-white mt-5">
							<Link to={'/'}>Quay về</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
