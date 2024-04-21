import DeleteButton from '../DeleteButton';
import OrderService from '../../services/OrderService';

function OrderCard({ order, canCancel }) {
	const { cancelOrder } = OrderService();

	const cancelOrderHandler = async (id) => {
		try {
			order.orderStatus = 'CANCELLED';
			await cancelOrder(id);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-black/5 rounded-md p-6 text-sm mx-44">
			<p className="font-bold mb-5 text-black/40">
				Trạng thái:{' '}
				<span className="font-normal">
					{order.orderStatus}
				</span>
				<p className='uppercase font-semibold mt-4'>{order.paymentStatus == "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</p>
			</p>
			<p className="font-bold">
				Ngày đặt:{' '}
				<span className="font-normal">
					{new Date(order.createdAt).toLocaleString('vi-VN')}
				</span>{' '}
			</p>
			<span className="font-bold">Địa chỉ: </span>
			{`${order.address?.addressDetail}, ${order.address?.commune}, ${order.address?.district}, ${order.address?.province}.`}
			<p className="font-bold">Sản phẩm:</p>
			{order.items.map((item) => (
				<div className="my-1 flex justify-between" key={item.id}>
					<div>
						<span>
							<img loading="lazy"
								className="inline-block h-12 w-12 object-cover rounded me-5"
								src={
									process.env.REACT_APP_BACKEND_SERVER +
									item.product.image.thumbnailPath
								}
							/>
						</span>
						<span>{item.product?.name}</span>
					</div>
					<div className="flex flex-col items-end text-xs">
						<p className="leading-tight">x {item.amount}</p>

						<p className="ms-1 font-bold leading-tight">
							{item.product?.salePrice
								? item.product.salePrice?.toLocaleString(
										'vi-VN'
								  )
								: item.product.price?.toLocaleString('vi-VN')}
							đ
						</p>
					</div>
				</div>
			))}
			<div className="text-right">
				<span className="font-bold">Tổng thành tiền: </span>
				<p className="">
					{order.items
						.reduce(
							(prev, curr) =>
								prev +
								(curr.product.salePrice ?? curr.product.price) *
									curr.amount,
							0
						)
						?.toLocaleString('vi-VN')}
					đ
				</p>
				{canCancel && (
					<DeleteButton
						item={order}
						type="text"
						text="Hủy đơn"
						description="Bạn chắc chắn muốn hủy đơn hàng này?"
						customClass={
							'mt-5 rounded p-1 px-3 text-white bg-red-500 hover:bg-red-700 duration-150'
						}
						deletefn={cancelOrderHandler}
					/>
				)}
			</div>
		</div>
	);
}

export default OrderCard;
