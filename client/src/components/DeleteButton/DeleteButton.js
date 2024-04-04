import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

function DeleteButton({
	description = 'Bạn chắc chắn muốn xóa mục này?',
	item,
	deletefn,
	type = 'icon',
}) {
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
		<div>
			{type === 'icon' ? (
				<button
					onClick={(e) => {
						e.preventDefault();
						setShowModal(true);
					}}
					className="text-white bg-red-500 hover:bg-red-600 duration-150 rounded w-7 h-7 flex items-center justify-center"
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			) : (
				<button
					onClick={(e) => {
						e.preventDefault();
						setShowModal(true);
					}}
					className="border text-red-500 border-red-500 rounded p-1 px-3 hover:text-white hover:bg-red-500 duration-150"
				>
					Xóa
				</button>
			)}
			{/* Confirm modal container */}
			{showModal && (
				<div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10 backdrop-brightness-75">
					{/* Modal */}
					<div
						ref={modal}
						className="bg-white rounded-md p-5 shadow-2xl"
					>
						<p className='text-wrap max-w-lg'>{description}</p>
						<div className="flex justify-center mt-5">
							<div className="flex gap-2">
								<button
									className="p-1.5 px-4 border border-red-500 rounded-md bg-red-500 hover:bg-red-600 duration-150 text-white"
									onClick={(e) => {
										e.preventDefault();
										deletefn(item.id);
										setShowModal(false);
									}}
								>
									Xóa
								</button>
								<button
									className="p-1.5 px-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 duration-150"
									onClick={(e) => {
										e.preventDefault();
										setShowModal(false);
									}}
								>
									Hủy
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default DeleteButton;
