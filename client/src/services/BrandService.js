import useAxios from '../hooks/useAxios';
import axios from '../api/publicAxios';
import { JsogService } from 'jsog-typescript';


const BRAND_API_URL = '/api/brand/';

function BrandService() {
	const loggedInAxios = useAxios();
	const JSOG = new JsogService();

	const getBrands = async () => {
		const response = await axios.get(BRAND_API_URL);
		return JSOG.deserialize(response.data);
	};

	const deleteBrand = async (id) => {
		await loggedInAxios.delete(BRAND_API_URL + id);
	};

	const createBrand = async (name, logoImageId, description) => {
		await loggedInAxios.post(
			BRAND_API_URL,
			JSON.stringify({
				brand: { name, description },
				logoImageId,
			})
		);
	};

	const updateBrand = async (id, name, logoImageId, description) => {
		await loggedInAxios.patch(
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
