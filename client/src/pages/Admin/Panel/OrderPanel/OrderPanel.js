import { useEffect, useState } from 'react';
import OrderService from '../../../../services/OrderService';
import DataTable from '../../../../components/DataTable';
import ChangePaidButton from '../../../../components/ChangePaidButton';
import ChangeOrderStatusButton from '../../../../components/ChangeOrderStatusButton/ChangeOrderStatusButton';

function OrderPanel() {
	const { getAllOrders, changePaidStatus, changeOrderStatus } =
		OrderService();

	const [orders, setOrders] = useState([]);

	const getOrdersHandler = async () => {
		try {
			setOrders(await getAllOrders());
		} catch (error) {
			console.log(error);
		}
	};

	const changePaidStatusHandler = async (order, paidStatus) => {
		try {
			order.paymentStatus = paidStatus;
			await changePaidStatus(order.id, paidStatus);
			getOrdersHandler();
		} catch (error) {
			console.log(error);
		}
	};

	const changeOrderStatusHandler = async (order, orderStatus) => {
		try {
			order.paymentStatus = orderStatus;
			await changeOrderStatus(order.id, orderStatus);
			getOrdersHandler();
		} catch (error) {
			console.log(error);
		}
	};

	const tableColumns = [
		{
			resize: true,
			label: 'Ngày đặt',
			renderCell: (item) => (
				<div className="text-sm">
					{new Date(item?.createdAt).toLocaleDateString('vi-VN')}
				</div>
			),
		},
		{
			resize: true,
			label: 'Sản phẩm',
			renderCell: (item) =>
				item.items.map((el) => (
					<div
						className="flex justify-between text-sm gap-4"
						key={el.id}
					>
						<p>{el.product.name}</p>
						<p>x{el.amount}</p>
					</div>
				)),
		},
		{
			resize: true,
			label: 'Thành tiền',
			renderCell: (item) => (
				<div className="text-sm">
					{item.items
						.reduce(
							(prev, curr) =>
								prev +
								(curr.product.salePrice ?? curr.product.price) *
									curr.amount,
							0
						)
						.toLocaleString('vi-VN')}
					đ
				</div>
			),
		},
		{
			resize: true,
			label: 'Thông tin người đặt',
			renderCell: (item) => (
				<div className="text-sm">
					<p>
						<span className="font-bold">Họ tên: </span>
						{item.user?.name}
					</p>
					<p>
						<span className="font-bold">Số điện thoại: </span>
						{item.user?.phoneNumber}
					</p>
					<p>
						<span className="font-bold">Địa chỉ: </span>
						{`${item.address?.addressDetail}, ${item.address?.commune}, ${item.address?.district}, ${item.address?.province}.`}
					</p>
				</div>
			),
		},
		{
			resize: true,
			label: 'Trạng thái',
			renderCell: (item) => (
				<div className="text-sm flex justify-between items-center">
					<span
						className={
							item.orderStatus == 'CANCELLED'
								? 'text-gray-300 font-bold'
								: item.orderStatus == 'DELIVERED'
								? 'text-amber-500 font-bold'
								: 'font-semibold'
						}
					>
						{item.orderStatus}
					</span>
					{item.orderStatus != 'CANCELLED' &&
						item.orderStatus != 'DELIVERED' && (
							<ChangeOrderStatusButton
								order={item}
								changefn={changeOrderStatusHandler}
							/>
						)}
				</div>
			),
		},
		{
			resize: true,
			label: 'Thanh toán',
			renderCell: (item) => (
				<div className="text-sm flex justify-between items-center">
					<span
						className={
							item.paymentStatus == 'PAID'
								? 'text-amber-500 font-bold'
								: 'font-semibold'
						}
					>
						{item.paymentStatus}
					</span>
					{item.paymentStatus == 'UNPAID' && (
						<ChangePaidButton
							order={item}
							changefn={changePaidStatusHandler}
						/>
					)}
				</div>
			),
		},
	];

	useEffect(() => {
		document.title = 'Quản lý đơn hàng';
		orders.length == 0 && getOrdersHandler();
	}, [orders]);
	return (
		<div>
			<DataTable
				tableTitle={'Danh sách đơn hàng'}
				tableData={orders.reverse()}
				tableColums={tableColumns}
				searchBy={{ text: 'tên người đặt' }}
				orderTable={true}
				templateCol="auto minmax(0, 1fr) auto auto auto auto"
			/>
		</div>
	);
}

export default OrderPanel;
