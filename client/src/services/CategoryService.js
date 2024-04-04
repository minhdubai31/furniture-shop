import useAxios from '../hooks/useAxios';
const CATEGORY_API_URL = '/api/category/';

function CategoryService() {
	const axios = useAxios();

	const getCategories = async () => {
		const response = await axios.get(CATEGORY_API_URL);
		return response.data;
	};

	const createCategory = async (name) => {
		await axios.post(CATEGORY_API_URL, {
			name,
		});
	};

	const updateCategory = async (id, name) => {
		await axios.patch(CATEGORY_API_URL + id, {
			name,
		});
	};

	const deleteCategory = async (id) => {
		await axios.delete(CATEGORY_API_URL + id);
	};

	return { getCategories, createCategory, updateCategory, deleteCategory };
}

export default CategoryService;
