import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import DecoratedHeading from '../DecoratedHeading';
import Gallery from '../Gallery';

function BrandForm({ createFn, updateBrand, updateFn, state }) {
	const [name, setName] = useState('');
	const [logoImage, setLogoImage] = useState();
	const [description, setDescription] = useState('');

	const clearAllFields = () => {
		setName('');
		setLogoImage();
		setDescription('');
	};

	const [errorMessage, setErrorMessage] = useState('');
	const [showModal, setShowModal] = state;
	const [showGalleryModal, setShowGalleryModal] = useState(false);

	const modal = useRef();

	const formSubmitHandler = (e) => {
		try {
			e.preventDefault();

			if (!updateBrand) createFn(name, logoImage?.id, description);
			else updateFn(updateBrand.id, name, logoImage?.id, description);
			setShowModal(false);
		} catch (error) {
			setErrorMessage('Đã có lỗi xảy ra.');
		}
	};

	useEffect(() => {
		if (updateBrand) {
			setName(updateBrand.name ?? '');
			setLogoImage(updateBrand.logo ?? '');
			setDescription(updateBrand.description ?? '');
		} else clearAllFields();

		const handleClickOutside = (event) => {
			if (modal.current && !modal.current.contains(event.target)) {
				setShowModal(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [updateBrand]);

	return (
		<div>
			{showModal && (
				<div className="fixed w-full h-full top-0 left-0 flex justify-center items-center z-10 backdrop-brightness-75">
					<div
						ref={modal}
						className="w-[500px] bg-white p-14 py-10 border rounded-md my-6 text-center shadow-2xl"
					>
						<DecoratedHeading
							content={
								updateBrand
									? 'Chỉnh sửa thương hiệu'
									: 'Thêm thương hiệu mới'
							}
						/>
						<div className="mt-10 text-left">
							{/* Error message */}
							<div className="mb-5">
								<span
									className={
										errorMessage &&
										'border rounded border-red-400 bg-red-50 text-red-500 p-1.5 px-2.5'
									}
								>
									{errorMessage}
								</span>
							</div>

							<form
								method="post"
								onSubmit={(e) => {
									formSubmitHandler(e);
									clearAllFields();
								}}
							>
								{/* Form fields */}
								<div className="mb-4">
									<label
										htmlFor="name"
										className="text-sm font-bold"
									>
										Tên thương hiệu
									</label>
									<input
										id="name"
										type="text"
										name="name"
										placeholder="Nhập tên thương hiệu"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
											setErrorMessage('');
										}}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="logo"
										className="text-sm font-bold"
									>
										Logo
									</label>

									{/* Gallery modal */}
									<Gallery
										isSelectable={true}
										setSelectedImage={setLogoImage}
										state={[
											showGalleryModal,
											setShowGalleryModal,
										]}
									/>

									<div>
										<button
											id="logo"
											name="logoImageId"
											className="min-h-32 min-w-32 bg-gray-50 hover:bg-gray-200 duration-150 border border-gray-300 rounded overflow-hidden"
											onClick={(e) => {
												e.preventDefault();
												setShowGalleryModal(true);
											}}
										>
											{logoImage?.thumbnailPath ? (
												<img loading="lazy"
													className="max-h-44 rounded hover:brightness-75 duration-150"
													src={
														process.env
															.REACT_APP_BACKEND_SERVER +
														logoImage.thumbnailPath
													}
												/>
											) : (
												<FontAwesomeIcon
													icon={faPlus}
												/>
											)}
										</button>
										{logoImage && (
											<p className="text-xs mt-0.5 text-gray-400 italic">
												Click vào hình để chọn ảnh khác.
											</p>
										)}
									</div>
								</div>
								<div className="mb-4">
									<label
										htmlFor="description"
										className="text-sm font-bold"
									>
										Thông tin
									</label>
									<textarea
										id="description"
										name="description"
										onChange={(e) => {
											setDescription(e.target.value);
											setErrorMessage('');
										}}
										value={description}
										rows={4}
										placeholder="Nhập tên thông tin thương hiệu"
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									></textarea>
								</div>

								{/* Submit button */}
								<div className="flex gap-2 justify-center">
									{updateBrand ? (
										<button
											type="submit"
											className="border border-green-500 rounded-md bg-green-500 hover:bg-green-600 duration-150 text-white p-2 px-3"
										>
											Cập nhật
										</button>
									) : (
										<button
											type="submit"
											className="border border-blue-500 rounded-md bg-blue-500 hover:bg-blue-600 duration-150 text-white p-2 px-3"
										>
											Thêm
										</button>
									)}
									<button
										onClick={() => setShowModal(false)}
										className="bg-gray-200 hover:bg-gray-300 border border-gray-300 duration-150 p-2 px-3 rounded-md"
									>
										Hủy
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default BrandForm;
