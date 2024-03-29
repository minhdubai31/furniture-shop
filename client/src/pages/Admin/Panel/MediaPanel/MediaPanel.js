import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import useAxios from '../../../../hooks/useAxios';

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

				getMeta(process.env.REACT_APP_BACKEND_SERVER+image?.path, (err, img) => {
					image.size = {
						width: img.naturalWidth,
						height: img.naturalHeight,
					};
				});
			});
			setImagesdata(response.data);
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

	useEffect(() => {
		fetchImagesdata();
	}, []);

	return (
		<>
			<div className="grid grid-cols-4">
				<div
					className={cx(
						selectingImage ? 'col-span-3' : 'col-span-full'
					)}
				>
					<label htmlFor="image-selector">
						<div className="p-2 mb-4 inline-block rounded bg-blue-500 hover:bg-blue-600 cursor-pointer duration-150 text-white">
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
					<div className="grid grid-cols-8 gap-1 duration-300">
						{imagesdata.map((image) => (
							<div
								className="aspect-square"
								key={image?.id}
								onClick={() => setSelectingImage(image)}
							>
								<img
									className="object-cover w-full h-full rounded"
									src={
										process.env.REACT_APP_BACKEND_SERVER +
										image?.path
									}
								/>
							</div>
						))}
					</div>
				</div>
				{selectingImage && (
					<div className="col-span-1 bg-white p-4 -m-4 ms-0 min-h-svh">
						<img
							ref={previewImage}
							className="object-cover w-full rounded"
							src={
								process.env.REACT_APP_BACKEND_SERVER +
								selectingImage?.path
							}
						/>
						<p className="mt-5 text-sm break-words">
							<span className="font-bold">Tên file:&nbsp;</span>
							{selectingImage?.name}
						</p>
						<p className="mt-1 text-sm break-words">
							<span className="font-bold">Kích thước:&nbsp;</span>
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
						<p className="mt-1 text-sm break-words">
							<span className="font-bold">Ngày đăng:&nbsp;</span>
							{selectingImage?.createdAt}
						</p>
					</div>
				)}
			</div>
		</>
	);
}

export default MediaPanel;
