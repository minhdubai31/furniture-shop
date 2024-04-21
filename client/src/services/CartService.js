import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const USER_API_URL = '/api/user/';

function CartService() {
	const loggedInAxios = useAxios();
	const { auth } = useAuth();
	const updateCart = async (productId, amount, replace) =>
		await loggedInAxios.post(USER_API_URL + auth.id + '/cart', {
			productId,
			amount,
			replace: replace ?? true
		});

	return { updateCart };
}

export default CartService;
