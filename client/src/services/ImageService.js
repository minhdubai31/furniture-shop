import useAxios from '../hooks/useAxios';
import { JsogService } from 'jsog-typescript';

const IMAGES_RESOURCE_URL = '/api/image/';

function ImageService() {
	const axios = useAxios();
	const JSOG = new JsogService();

	const getImages = async () => {
		const response = await axios.get(IMAGES_RESOURCE_URL);
		return JSOG.deserialize(response.data.reverse());
	};

	const uploadImage = async (file, setUploadProgress) => {
		await axios.post(
			IMAGES_RESOURCE_URL,
			{ image: file },
			{
				headers: { 'Content-Type': 'multipart/form-data' },
				onUploadProgress: (progressEvent) => {
					let percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					setUploadProgress(percentCompleted);
				},
			}
		);
	};

	const deleteImage = async (id) => {
		await axios.delete(IMAGES_RESOURCE_URL + id);
	};

	return { getImages, uploadImage, deleteImage };
}

export default ImageService;
