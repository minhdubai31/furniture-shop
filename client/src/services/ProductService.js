import useAxios from '../hooks/useAxios';
import axios from '../api/publicAxios';
import { JsogService } from 'jsog-typescript';
import useAuth from '../hooks/useAuth';

const PRODUCTS_API_URL = '/api/product/';
const COMMENTS_API_URL = '/api/comment/';

function ProductService() {
	const loggedInAxios = useAxios();
	const { auth } = useAuth();
	const JSOG = new JsogService();

	const getProducts = async () => {
		const response = await axios.get(PRODUCTS_API_URL);
		return JSOG.deserialize(response.data);
	};

	const getProduct = async (id) => {
		const response = await axios.get(PRODUCTS_API_URL + id);
		return JSOG.deserialize(response.data);
	};

	const findProductsByName = async (name) => {
		const response = await axios.get(
			PRODUCTS_API_URL + `find?name=${name}`
		);
		return JSOG.deserialize(response.data);
	};

	const createProduct = async (
		name,
		description,
		price,
		salePrice,
		imageId,
		categoryId,
		brandId,
		length,
		width,
		height,
		weight,
		remainingAmount
	) =>
		await loggedInAxios.post(PRODUCTS_API_URL, {
			product: {
				name,
				description,
				price,
				salePrice,
				length,
				width,
				height,
				weight,
				remainingAmount
			},
			imageId,
			categoryId,
			brandId,
		});

	const updateProduct = async (
		id,
		name,
		description,
		price,
		salePrice,
		imageId,
		categoryId,
		brandId,
		length,
		width,
		height,
		weight,
		remainingAmount
	) => {
		await loggedInAxios.patch(PRODUCTS_API_URL + id, {
			product: {
				name,
				description,
				price,
				salePrice,
				length,
				width,
				height,
				weight,
				remainingAmount
			},
			imageId,
			categoryId,
			brandId,
		});
	};

	const deleteProduct = async (id) => {
		await loggedInAxios.delete(PRODUCTS_API_URL + id);
	};

	const updateProductGallery = async (id, imageIdsList) => {
		await loggedInAxios.post(
			PRODUCTS_API_URL + id + '/gallery',
			imageIdsList
		);
	};

	const addComment = async (id, comment, repId) => {
		return await loggedInAxios.post(PRODUCTS_API_URL + id + '/comment', {
			userId: auth.id,
			content: comment,
			replyId: repId,
		});
	};

	const deleteComment = async (id) => {
		await loggedInAxios.delete(COMMENTS_API_URL + id);
	};

	return {
		getProducts,
		getProduct,
		createProduct,
		updateProduct,
		deleteProduct,
		updateProductGallery,
		addComment,
		deleteComment,
		findProductsByName,
	};
}

export default ProductService;
