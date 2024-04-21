import { useState, useEffect } from 'react';
import OrderService from '../../services/OrderService';
import OrderCard from '../../components/OrderCard';

function Order() {
	const { getOrdersOfCurrUser } = OrderService();
	const [pendingOrders, setPendingOrders] = useState([]);
	const [acceptedOrders, setAcceptedOrders] = useState([]);
	const [deliveringOrders, setDeliveringOrders] = useState([]);
	const [deliveredOrders, setDeliveredOrders] = useState([]);
	const [cancelledOrders, setCancelledOrders] = useState([]);

	const [activeTab, setActiveTab] = useState('PENDING');

	const getOrdersHandler = async () => {
		try {
			const orders = await getOrdersOfCurrUser();
			setPendingOrders(
				orders.filter((order) => order.orderStatus == 'PENDING')
			);
			setAcceptedOrders(
				orders.filter((order) => order.orderStatus == 'ACCEPTED')
			);
			setDeliveringOrders(
				orders.filter((order) => order.orderStatus == 'DELIVERING')
			);
			setDeliveredOrders(
				orders.filter((order) => order.orderStatus == 'DELIVERED')
			);
			setCancelledOrders(
				orders.filter((order) => order.orderStatus == 'CANCELLED')
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		document.title = 'Đơn hàng của bạn';
		getOrdersHandler();
	}, [
		pendingOrders,
		acceptedOrders,
		deliveringOrders,
		deliveredOrders,
		cancelledOrders,
	]);

	return (
		<div className="bg-gray-100 py-5">
			<div className="w-[1280px] m-auto bg-white border rounded-md p-12">
				<div className="flex gap-5 justify-between">
					<button
						onClick={(e) => setActiveTab('PENDING')}
						className={
							activeTab == 'PENDING'
								? 'p-2 w-full text-white bg-black rounded-md'
								: 'p-2 w-full'
						}
					>
						Chờ xác nhận
					</button>
					<button
						onClick={(e) => setActiveTab('ACCEPTED')}
						className={
							activeTab == 'ACCEPTED'
								? 'p-2 w-full text-white bg-black rounded-md'
								: 'p-2 w-full'
						}
					>
						Đã xác nhận
					</button>
					<button
						onClick={(e) => setActiveTab('DELIVERING')}
						className={
							activeTab == 'DELIVERING'
								? 'p-2 w-full text-white bg-black rounded-md'
								: 'p-2 w-full'
						}
					>
						Đang giao hàng
					</button>
					<button
						onClick={(e) => setActiveTab('DELIVERED')}
						className={
							activeTab == 'DELIVERED'
								? 'p-2 w-full text-white bg-black rounded-md'
								: 'p-2 w-full'
						}
					>
						Đã giao hàng
					</button>
					<button
						onClick={(e) => setActiveTab('CANCELLED')}
						className={
							activeTab == 'CANCELLED'
								? 'p-2 w-full text-white bg-black rounded-md'
								: 'p-2 w-full'
						}
					>
						Đã hủy
					</button>
				</div>
				<div className="mt-10">
					<div className="flex flex-col gap-4">
						{activeTab == 'PENDING' &&
							pendingOrders
								?.toReversed()
								.map((order) => (
									<OrderCard
										order={order}
										key={order.id}
										canCancel={true}
									/>
								))}
						{activeTab == 'DELIVERING' &&
							deliveringOrders
								?.toReversed()
								.map((order) => (
									<OrderCard order={order} key={order.id} />
								))}
						{activeTab == 'DELIVERED' &&
							deliveredOrders
								?.toReversed()
								.map((order) => (
									<OrderCard order={order} key={order.id} />
								))}
						{activeTab == 'CANCELLED' &&
							cancelledOrders
								?.toReversed()
								.map((order) => (
									<OrderCard order={order} key={order.id} />
								))}
						{activeTab == 'ACCEPTED' &&
							acceptedOrders
								?.toReversed()
								.map((order) => (
									<OrderCard order={order} key={order.id} />
								))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Order;
