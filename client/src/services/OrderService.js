import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import { JsogService } from 'jsog-typescript';

const ORDER_API_URL = '/api/order/';

function OrderService() {
	const { auth } = useAuth();
	const loggedInAxios = useAxios();
	const JSOG = new JsogService();

	const getAllOrders = async () => {
		const response = await loggedInAxios.get(ORDER_API_URL);
		return JSOG.deserialize(response.data);
	};

	const getOrdersOfCurrUser = async () => {
		const response = await loggedInAxios.get(ORDER_API_URL + auth.id);
		return JSOG.deserialize(response.data);
	};

	const transferCartToOrder = async (addressId) => {
		await loggedInAxios.post(ORDER_API_URL + 'cart/' + auth.id, addressId);
	};

	const buyNowOrder = async (productId, amount, addressId) => {
		await loggedInAxios.post(ORDER_API_URL + 'buynow', {
			productId,
			amount,
			addressId,
			userId: auth.id,
		});
	};

	const cancelOrder = async (orderId) => {
		await loggedInAxios.patch(ORDER_API_URL + orderId, {
			orderStatus: 'CANCELLED',
		});
	};

	const changePaidStatus = async (orderId, paidStatus) => {
		await loggedInAxios.patch(ORDER_API_URL + orderId, {
         paymentStatus: paidStatus
      });
	}

	const changeOrderStatus = async (orderId, orderStatus) => {
		await loggedInAxios.patch(ORDER_API_URL + orderId, {
         orderStatus
      });
	}

	return {
		getAllOrders,
		cancelOrder,
		getOrdersOfCurrUser,
		transferCartToOrder,
		buyNowOrder,
		changePaidStatus,
		changeOrderStatus,
	};
}

export default OrderService;
