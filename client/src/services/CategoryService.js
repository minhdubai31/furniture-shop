import useAxios from '../hooks/useAxios';
import axios from '../api/publicAxios';
import { JsogService } from 'jsog-typescript';

const CATEGORY_API_URL = '/api/category/';

function CategoryService() {
	const loggedInAxios = useAxios();
	const JSOG = new JsogService();

	const getCategories = async () => {
		const response = await axios.get(CATEGORY_API_URL);
		return JSOG.deserialize(response.data);
	};

	const createCategory = async (name) => {
		await loggedInAxios.post(CATEGORY_API_URL, {
			name,
		});
	};

	const updateCategory = async (id, name) => {
		await loggedInAxios.patch(CATEGORY_API_URL + id, {
			name,
		});
	};

	const deleteCategory = async (id) => {
		await loggedInAxios.delete(CATEGORY_API_URL + id);
	};

	return { getCategories, createCategory, updateCategory, deleteCategory };
}

export default CategoryService;
