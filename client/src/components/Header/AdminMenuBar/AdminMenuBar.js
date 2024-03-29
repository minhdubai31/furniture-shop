import { Link } from 'react-router-dom';

function AdminMenuBar() {
	return (
		<div>
			<div className="flex items-center px-10 h-8 bg-black text-white/45 text-xs">
				<span>Bạn đang truy cập với quyền quản trị viên</span>
				<span className="ms-5 bg-white/80 text-black rounded-sm p-0.5 px-2">
					<Link to={'/admin'}>Trang quản lý</Link>
				</span>
			</div>
		</div>
	);
}

export default AdminMenuBar;
