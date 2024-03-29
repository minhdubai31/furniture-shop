import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import useAxios from '../../../../hooks/useAxios';
import Loading from '../../../../components/Loading';
import DeleteButton from '../../../../components/DeleteButton';

const MEDIA_RESOURCES_URL = '/api/image/';

function MediaPanel() {
	const [imagesdata, setImagesdata] = useState([]);
	const [selectingImage, setSelectingImage] = useState();
	const axios = useAxios();

	const previewImage = useRef();

	const fetchImagesdata = async () => {
		try {
			const response = await axios.get(MEDIA_RESOURCES_URL);
			response.data.forEach(async (image) => {
				const getMeta = (url, cb) => {
					const img = new Image();
					img.onload = () => cb(null, img);
					img.onerror = (err) => cb(err);
					img.src = url;
				};

				getMeta(
					process.env.REACT_APP_BACKEND_SERVER + image?.path,
					(err, img) => {
						image.size = {
							width: img?.naturalWidth,
							height: img?.naturalHeight,
						};
					}
				);
			});
			setImagesdata(response.data.reverse());
		} catch (error) {
			console.log(error);
		}
	};

	const uploadNewImage = async (file) => {
		try {
			await axios.post(
				MEDIA_RESOURCES_URL,
				{ image: file },
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			);
			fetchImagesdata();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteImageHandler = async (id) => {
		try {
			await axios.delete(MEDIA_RESOURCES_URL + id);
			setSelectingImage('deleted');
			fetchImagesdata();
		} catch (error) {
			console.log(error);
		}
	};

	const imageLoadingHandler = (e) => {
		e.target.classList.remove('opacity-0');
		e.target.previousSibling.remove();
	};

	useEffect(() => {
		fetchImagesdata();
	}, []);

	return (
		<div className="grid grid-cols-4 duration-300">
			<div
				className={cx(
					selectingImage ? 'col-span-3' : 'col-span-full',
					'bg-white p-6 py-8 rounded border'
				)}
			>
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
					onChange={(e) => uploadNewImage(e.target.files[0])}
					type="file"
					name="image"
				/>
				<div
					className={cx(
						'grid gap-1 max-h-[70vh] overflow-y-auto',
						selectingImage ? 'grid-cols-6' : 'grid-cols-8'
					)}
				>
					{imagesdata.map((image) => (
						<div
							className={cx(
								'aspect-square relative duration-150',
								image != selectingImage && 'hover:brightness-75'
							)}
							key={image?.id}
							onClick={() => setSelectingImage(image)}
						>
							<Loading className="w-full h-full flex justify-center items-center" />
							<img
								onLoad={imageLoadingHandler}
								className="object-cover w-full h-full rounded opacity-0 border cursor-pointer"
								src={
									process.env.REACT_APP_BACKEND_SERVER +
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
			{selectingImage && (
				<div className="col-span-1 flex flex-col bg-white border-s p-4 -m-4 ms-4 min-h-svh">
					<button
						className="float-right mb-2 -mt-2 text-xs p-2 rounded border border-zinc-300"
						onClick={() => setSelectingImage()}
					>
						Đóng
					</button>
					{selectingImage == 'deleted' ? (
						<div className="h-full w-full -mt-4 flex items-center justify-center">
							<span>Hình ảnh không tồn tại</span>
						</div>
					) : (
						<>
							<img
								ref={previewImage}
								className="object-cover w-full rounded border"
								src={
									process.env.REACT_APP_BACKEND_SERVER +
									selectingImage?.path
								}
							/>
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
								{selectingImage.size?.width}x
								{selectingImage.size?.height}
							</p>
							<p className="mt-1 text-sm break-words">
								<span className="font-bold">URL:&nbsp;</span>
								<a
									target="_blank"
									className="text-blue-500"
									href={
										process.env.REACT_APP_BACKEND_SERVER +
										selectingImage?.path
									}
								>
									{process.env.REACT_APP_BACKEND_SERVER +
										selectingImage?.path}
								</a>
							</p>
							<p className="mt-1 mb-5 text-sm break-words">
								<span className="font-bold">
									Ngày đăng:&nbsp;
								</span>
								{selectingImage?.createdAt}
							</p>
							<DeleteButton
								type="text"
								item={selectingImage}
								deletefn={deleteImageHandler}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default MediaPanel;
