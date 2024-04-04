import useAxios from '../hooks/useAxios';

const PRODUCTS_API_URL = '/api/product/';

function ProductService() {
	const axios = useAxios();

   const getProducts = async () => {
      const response = await axios.get(PRODUCTS_API_URL);
      return response.data;
   }

	return { getProducts };
}

export default ProductService;
