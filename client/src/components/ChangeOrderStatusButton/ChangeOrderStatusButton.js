import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

function ChangeOrderStatusButton({ order, changefn }) {
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
				className="text-white bg-blue-600 rounded h-7 w-28 text-xs ms-2 px-2"
			>
				<FontAwesomeIcon icon={faArrowRight} />
				<span className="ms-2">
					{order.orderStatus == 'PENDING'
						? 'ACCEPTED'
						: order.orderStatus == 'ACCEPTED'
						? 'DELIVERING'
						: 'DELIVERED'}
				</span>
			</button>
			{/* Confirm modal container */}
			{showModal && (
				<div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10 backdrop-brightness-75">
					{/* Modal */}
					<div
						ref={modal}
						className="bg-white h-fit rounded-md p-5 shadow-2xl"
					>
						<p>Bạn chắc chắn muốn thực hiện thay đổi này?</p>
						<div className="flex justify-center mt-5">
							<div className="flex gap-2">
								<button
									className="p-1.5 px-4 rounded-md bg-blue-600 hover:bg-blue-700 duration-150 text-white"
									onClick={() => {
										changefn(
											order,
											order.orderStatus == 'PENDING'
												? 'ACCEPTED'
												: order.orderStatus ==
												  'ACCEPTED'
												? 'DELIVERING'
												: 'DELIVERED'
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

export default ChangeOrderStatusButton;
