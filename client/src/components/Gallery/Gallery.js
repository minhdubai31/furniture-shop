import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import Loading from '../Loading';
import DeleteButton from '../DeleteButton';

import ImageService from '../../services/ImageService';

function Gallery({ isSelectable, setSelectedImage, state }) {
	const [imagesdata, setImagesdata] = useState([]);
	const [selectingImage, setSelectingImage] = useState();
	const [uploadingImage, setUploadingImage] = useState();
	const [uploadProgress, setUploadProgress] = useState(0);


	const defaultGalleryState = useState(false);
	const [showGalleryModal, setShowGalleryModal] = state ?? defaultGalleryState;

	const previewImage = useRef();
	const modal = useRef();
	const { getImages, uploadImage, deleteImage } = ImageService();

	const fetchImages = async () => {
		try {
			const images = await getImages();
			setImagesdata(images);
		} catch (error) {
			console.log(error);
		}
	};

	const uploadImageHandler = async (file) => {
		try {
			setUploadingImage(URL.createObjectURL(file));
			await uploadImage(file, setUploadProgress);
			fetchImages();
			setUploadingImage();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteImageHandler = async (id) => {
		try {
			await deleteImage(id);
			setSelectingImage('deleted');
			fetchImages();
		} catch (error) {
			console.log(error);
		}
	};

	const [isObserving, setIsObserving] = useState(false);

	// Image detail panel load animation handler
	const observer = new MutationObserver((mutationsList) => {
		mutationsList.forEach((mutation) => {
			if (mutation.attributeName === 'src') {
				// Hide current image and show loading indicator
				mutation.target.classList.add('opacity-0');
				mutation.target.previousSibling.classList.remove('hidden');
			}
		});
	});

	const imagePreviewOnLoadHandler = (e) => {
		if (!isObserving) {
			observer.observe(e.target, { attributes: true });
			setIsObserving(true);
		}
		e.target.classList.remove('opacity-0');
		e.target.previousSibling.classList.add('hidden');
	};

	const imagesLoadingHandler = (e) => {
		e.target.classList.remove('opacity-0');
		e.target.previousSibling.remove();
	};

	useEffect(() => {
		fetchImages();

		const handleClickOutside = (event) => {
			if (modal.current && !modal.current.contains(event.target)) {
				setShowGalleryModal(false);
			}
		};

		isSelectable &&
			document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div>
			{(showGalleryModal || !isSelectable) && (
				<div
					className={
						isSelectable
							? 'fixed w-full h-full top-0 left-0 backdrop-brightness-75 flex justify-center items-center p-10 overflow-auto z-10'
							: ''
					}
				>
					<div
						ref={modal}
						className={
							isSelectable
								? 'drop-shadow-2xl grid grid-cols-4 duration-300 max-h-full overflow-auto'
								: 'grid grid-cols-4 duration-300'
						}
					>
						<div
							className={
								selectingImage ? 'col-span-3' : 'col-span-full'
							}
						>
							<div className="bg-white p-6 py-8 rounded border">
								<h1 className="text-2xl font-bold upper mb-5">
									Danh sách hình ảnh
								</h1>
								<label htmlFor="image-selector">
									<div className="p-2 px-4 mb-4 inline-block rounded border border-zinc-500 hover:bg-zinc-600 cursor-pointer duration-150 text-black hover:text-white">
										Upload
									</div>
								</label>
								<input
									hidden
									id="image-selector"
									onChange={(e) =>
										uploadImageHandler(e.target.files[0])
									}
									type="file"
									name="image"
								/>
								<div
									className={cx(
										selectingImage
											? 'grid-cols-6'
											: 'grid-cols-8',
										isSelectable
											? 'grid gap-1 max-h-[61vh] overflow-y-auto'
											: 'grid gap-1 max-h-[70vh] overflow-y-auto'
									)}
								>
									{uploadingImage && (
										<div className="relative aspect-square">
											<span className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xs z-20">
												<div className="bg-blue-100 rounded-full overflow-hidden w-10 h-1.5">
													<div
														className="bg-blue-500 h-full"
														style={{
															width:
																uploadProgress +
																'%',
														}}
													></div>
												</div>
											</span>
											<img
												className="object-cover w-full h-full rounded border cursor-pointer"
												src={uploadingImage}
											/>
											<div className="absolute w-full h-full rounded top-0 left-0 bg-zinc-100/80 flex justify-center items-center z-10 text-xs text-white border border-zinc-300"></div>
										</div>
									)}
									{imagesdata.map((image) => (
										<div
											className={cx(
												'aspect-square relative duration-150',
												image != selectingImage &&
													'hover:brightness-75'
											)}
											key={image?.id}
											onClick={() =>
												setSelectingImage(image)
											}
										>
											<Loading className="absolute top-0 left-0" />
											<img
												onLoad={imagesLoadingHandler}
												className="object-cover w-full h-full rounded opacity-0 border cursor-pointer duration-150"
												src={
													process.env
														.REACT_APP_BACKEND_SERVER +
													image?.thumbnailPath
												}
											/>
											{image == selectingImage && (
												<div className="absolute w-full h-full rounded top-0 left-0 bg-gray-100/80 flex justify-center items-center z-10 text-xs text-white border border-zinc-300">
													<span className="drop-shadow-md">
														Đang chọn
													</span>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Detail Panel */}
						{selectingImage && (
							<div
								className={
									isSelectable
										? 'col-span-1 flex flex-col relative bg-white border-s p-4 rounded ms-4 min-h-fit'
										: 'col-span-1 flex flex-col bg-white border-s p-4 -m-4 ms-4 min-h-svh'
								}
							>
								<button
									className="mb-2 -mt-2 text-xs p-2 rounded border border-zinc-300"
									onClick={() => setSelectingImage()}
								>
									Đóng
								</button>
								{selectingImage == 'deleted' ? (
									<div className="h-full w-full -mt-4 flex items-center justify-center">
										<span>Hình ảnh không tồn tại</span>
									</div>
								) : (
									<div>
										<div
											className={
												isSelectable
													? 'relative max-h-72 rounded border overflow-hidden'
													: 'relative max-h-96 rounded border overflow-hidden'
											}
										>
											<Loading className="absolute top-0 left-0" />
											<img
												ref={previewImage}
												onLoad={
													imagePreviewOnLoadHandler
												}
												className="object-cover opacity-0 duration-150"
												src={
													process.env
														.REACT_APP_BACKEND_SERVER +
													selectingImage.path
												}
											/>
										</div>
										<p className="mt-5 text-sm break-words">
											<span className="font-bold">
												Tên file:&nbsp;
											</span>
											{selectingImage?.name}
										</p>
										<p className="mt-1 text-sm break-words">
											<span className="font-bold">
												Kích thước:&nbsp;
											</span>
											{selectingImage?.width}x
											{selectingImage?.height}
										</p>
										<p className="mt-1 text-sm break-words">
											<span className="font-bold">
												URL:&nbsp;
											</span>
											<a
												target="_blank"
												className="text-blue-500"
												href={
													process.env
														.REACT_APP_BACKEND_SERVER +
													selectingImage?.path
												}
											>
												{process.env
													.REACT_APP_BACKEND_SERVER +
													selectingImage?.path}
											</a>
										</p>
										<p className="mt-1 text-sm break-words">
											<span className="font-bold">
												Ngày đăng:&nbsp;
											</span>
											{selectingImage?.createdAt}
										</p>
										<p className="mt-1 mb-3 text-sm break-words">
											<span className="font-bold">
												Dung lượng:&nbsp;
											</span>
											{selectingImage?.size}
										</p>

										<DeleteButton
											type="text"
											item={selectingImage}
											deletefn={deleteImageHandler}
										/>
									</div>
								)}
								{isSelectable && (
									<button
										onClick={(e) => {
											e.preventDefault();
											setSelectedImage(selectingImage);
											setShowGalleryModal(false);
										}}
										className="border absolute bottom-4 left-1/2 -translate-x-1/2 block border-blue-500 text-white bg-blue-500 rounded p-1 px-3 hover:bg-blue-600 duration-150"
									>
										Chọn ảnh này
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Gallery;
