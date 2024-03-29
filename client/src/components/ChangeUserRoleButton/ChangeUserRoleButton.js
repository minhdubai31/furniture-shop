import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

function ChangeUserRoleButton({ item, changeRolefn }) {
	const [showModal, setShowModal] = useState(false);

	const modal = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modal.current && !modal.current.contains(event.target)) {
				setShowModal(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className="text-white bg-blue-500 rounded h-7 text-xs ms-4 px-2"
			>
				<FontAwesomeIcon icon={faArrowRight} />
				<span className="ms-2">
					{item.role == 'ADMIN' ? 'USER' : 'ADMIN'}
				</span>
			</button>
			{/* Confirm modal container */}
			{showModal && (
				<div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10 backdrop-brightness-75">
					{/* Modal */}
					<div
						ref={modal}
						className="bg-white rounded-md p-5 shadow-2xl"
					>
						<p>Bạn chắc chắn muốn thực hiện thay đổi này?</p>
						<p className="mt-2 text-zinc-400 text-center text-sm">
							Quyền của {item.username}
						</p>
						<p className="text-zinc-400 text-center text-sm">
							{item.role} &rarr;{' '}
							{item.role == 'ADMIN' ? 'USER' : 'ADMIN'}
						</p>
						<div className="flex justify-center mt-5">
							<div className="flex gap-2">
								<button
									className="p-1.5 px-4 rounded-md bg-blue-500 hover:bg-blue-600 duration-150 text-white"
									onClick={() => {
										changeRolefn(
											item.id,
											item.role == 'ADMIN'
												? 'USER'
												: 'ADMIN'
										);
										setShowModal(false);
									}}
								>
									Cập nhật
								</button>
								<button
									className="p-1.5 px-4 rounded-md bg-gray-200 hover:bg-gray-300 duration-150"
									onClick={() => setShowModal(false)}
								>
									Hủy
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ChangeUserRoleButton;
