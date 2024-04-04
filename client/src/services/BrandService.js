import useAxios from '../hooks/useAxios';

const BRAND_API_URL = '/api/brand/';

function BrandService() {
	const axios = useAxios();

	const getBrands = async () => {
		const response = await axios.get(BRAND_API_URL);
		return response.data;
	};

	const deleteBrand = async (id) => {
		await axios.delete(BRAND_API_URL + id);
	};

	const createBrand = async (name, logoImageId, description) => {
		await axios.post(
			BRAND_API_URL,
			JSON.stringify({
				brand: { name, description },
				logoImageId,
			})
		);
	};

	const updateBrand = async (id, name, logoImageId, description) => {
		await axios.patch(
			BRAND_API_URL + id,
			JSON.stringify({
				brand: { name, description },
				logoImageId,
			})
		);
	};

	return { getBrands, createBrand, deleteBrand, updateBrand };
}

export default BrandService;
