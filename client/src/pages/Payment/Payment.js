import { useEffect, useState, useContext } from 'react';
import DecoratedHeading from '../../components/DecoratedHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import OrderService from '../../services/OrderService';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import DeleteButton from '../../components/DeleteButton';
import CartContext from '../../context/CartProvider';

function Payment() {
	const { getCurrUser, addAddress, deleteAddress, updatePhoneNumber } =
		UserService();
	const { transferCartToOrder, buyNowOrder } = OrderService();

	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const [user, setUser] = useState();
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState();
	const { setCartNumber } = useContext(CartContext);

	const [phoneNumber, setPhoneNumber] = useState('');
	const [province, setProvince] = useState('');
	const [district, setDistrict] = useState('');
	const [commune, setCommune] = useState('');
	const [addressDetail, setAddressDetail] = useState('');

	const loginFields = [
		{
			id: 'province',
			name: 'province',
			type: 'text',
			label: 'Tỉnh/Thành phố',
			placeholder: 'Nhập tỉnh/Thành phố',
			value: province,
			changeValue: setProvince,
		},
		{
			id: 'district',
			name: 'district',
			type: 'text',
			label: 'Huyện',
			placeholder: 'Nhập huyện',
			value: district,
			changeValue: setDistrict,
		},
		{
			id: 'commune',
			name: 'commune',
			type: 'text',
			label: 'Xã',
			placeholder: 'Nhập xã',
			value: commune,
			changeValue: setCommune,
		},
		{
			id: 'addressDetail',
			name: 'addressDetail',
			type: 'text',
			label: 'Địa chỉ',
			placeholder: 'Nhập địa chỉ',
			value: addressDetail,
			changeValue: setAddressDetail,
		},
	];

	const orderSubmitHandler = async () => {
		try {
			if (searchParams.get('buynow')) {
				await buyNowOrder(
					location.state[0].product.id,
					location.state[0].amount,
					selectedAddress.id
				);
			} else {
				setCartNumber(0);
				await transferCartToOrder(selectedAddress.id);
			}
			navigate('/order');
		} catch (error) {
			console.log(error);
		}
	};

	const addAddressHandler = async (
		province,
		district,
		commune,
		addressDetail
	) => {
		try {
			setShowAddressForm(false);
			await addAddress(province, district, commune, addressDetail);
			setProvince('');
			setDistrict('');
			setCommune('');
			setAddressDetail('');
			await getUserHandler();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteAddressHandler = async (addressId) => {
		try {
			await deleteAddress(addressId);
			await getUserHandler();
		} catch (error) {
			console.log(error);
		}
	};

	const updatePhoneNumberHandler = async () => {
		try {
			setUser(await updatePhoneNumber(phoneNumber));
		} catch (error) {
			console.log(error);
		}
	};

	const getUserHandler = async () => {
		try {
			const user = await getCurrUser();
			setUser(user);
			if (!selectedAddress) {
				setSelectedAddress(user.addresses[0]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		document.title = 'Thanh toán';
		getUserHandler();
	}, []);
	return (
		<div className="bg-gray-100 py-5">
			<div className="w-[1280px] m-auto bg-white border rounded-md p-12 px-44">
				<DecoratedHeading content="Xác nhận thanh toán" />
				<div className="flex gap-10 justify-between pt-10">
					<div>
						<div>
							<p className="font-bold">Thông tin người đặt:</p>
							<p>Họ tên: {user?.name}</p>
							<p>Số điện thoại: {user?.phoneNumber}</p>
							{user && !user?.phoneNumber && (
								<div>
									<input
										id="phoneNumber"
										name="phoneNumber"
										placeholder="0123456789"
										value={phoneNumber}
										onChange={(e) => {
											setPhoneNumber(e.target.value);
										}}
										className="w-80 border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
									<p className="text-xs text-red-500 italic mb-2">
										Vui lòng cập nhật số điện thoại
									</p>
									<button
										onClick={updatePhoneNumberHandler}
										className="text-center mb-5 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 duration-150"
									>
										Cập nhật
									</button>
								</div>
							)}
							<p>
								Địa chỉ:{' '}
								<span
									className={
										showAddressForm
											? 'ms-10 cursor-pointer text-red-500 hover:text-red-700'
											: 'ms-10 cursor-pointer text-blue-500 hover:text-blue-700'
									}
									onClick={(e) =>
										setShowAddressForm(!showAddressForm)
									}
								>
									{showAddressForm ? (
										<>
											<FontAwesomeIcon
												icon={faCircleMinus}
											/>{' '}
											Hủy
										</>
									) : (
										<>
											<FontAwesomeIcon
												icon={faCirclePlus}
											/>{' '}
											Thêm
										</>
									)}
								</span>
							</p>
							{showAddressForm && (
								<div>
									<form
										onSubmit={(e) => {
											e.preventDefault();
											addAddressHandler(
												province,
												district,
												commune,
												addressDetail
											);
										}}
									>
										{loginFields.map((field) => (
											<div
												key={field.id}
												className="mb-2"
											>
												<label
													htmlFor={field.id}
													className="text-sm font-bold"
												>
													{field.label + ':'}
												</label>
												<input
													id={field.id}
													type={field.type}
													name={field.name}
													placeholder={
														field.placeholder
													}
													value={field.value}
													onChange={(e) => {
														field.changeValue(
															e.target.value
														);
													}}
													className="w-80 border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
												/>
											</div>
										))}
										<button className="text-center mb-10 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 duration-150">
											Thêm
										</button>
									</form>
								</div>
							)}
							{user?.addresses.map((address) => (
								<div key={address.id}>
									<input
										type="radio"
										value={address.id}
										name="addressId"
										checked={
											address.id == selectedAddress?.id
										}
										onChange={(e) =>
											setSelectedAddress(address)
										}
									/>
									<label className="ms-2">{`${address?.addressDetail}, ${address?.commune}, ${address?.district}, ${address?.province}.`}</label>
									<DeleteButton
										item={address}
										deletefn={deleteAddressHandler}
										description="Bạn chắc chắn muốn xóa địa chỉ này?"
										type="icon"
										customClass={
											'text-red-500 hover:text-red-700 ms-5 text-xs'
										}
									/>
								</div>
							))}
						</div>
						<p className="font-bold mt-8">Thông tin đơn hàng:</p>
						{location.state.map((item) => (
							<div
								className="my-1 w-96 flex justify-between"
								key={item.id}
							>
								<div>
									<span>
										<img loading="lazy"
											className="inline-block h-12 w-12 object-cover rounded me-5"
											src={
												process.env
													.REACT_APP_BACKEND_SERVER +
												item.product.image.thumbnailPath
											}
										/>
									</span>
									<span>{item.product?.name}</span>
								</div>
								<div className="flex flex-col items-end text-xs">
									<p className="leading-tight">
										x {item.amount}
									</p>

									<p className="ms-1 font-bold leading-tight">
										{item.product?.salePrice
											? item.product.salePrice?.toLocaleString(
													'vi-VN'
											  )
											: item.product.price?.toLocaleString(
													'vi-VN'
											  )}
										đ
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="bg-black/5 rounded-md p-4 w-72 h-fit text-center flex flex-col justify-between">
						<div>
							<p className="font-bold">Tổng thành tiền</p>
							<p className="my-4 text-2xl">
								{location.state
									.reduce(
										(prev, curr) =>
											prev +
											(curr.product.salePrice ??
												curr.product.price) *
												curr.amount,
										0
									)
									?.toLocaleString('vi-VN')}
								đ
							</p>
							<div className="text-sm text-left">
								<p>
									<span className="font-bold">Họ tên: </span>
									{user?.name}
								</p>
								<p>
									<span className="font-bold">
										Số điện thoại:{' '}
									</span>
									{user?.phoneNumber}
								</p>
								<p>
									<span className="font-bold">Địa chỉ: </span>
									{selectedAddress &&
										`${selectedAddress?.addressDetail}, ${selectedAddress?.commune}, ${selectedAddress?.district}, ${selectedAddress?.province}.`}
								</p>
								<p>
									<span className="font-bold">
										Ngày đặt hàng:{' '}
									</span>
									{new Date(Date.now()).toLocaleDateString(
										'vi-VN'
									)}
								</p>
							</div>
						</div>
						<button
							onClick={orderSubmitHandler}
							className="text-center p-2 mt-4 rounded-md bg-black text-white border border-zinc-800 hover:bg-zinc-600 duration-150"
						>
							Đặt hàng
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
