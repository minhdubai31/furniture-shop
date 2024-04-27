import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';

import DecoratedHeading from '../DecoratedHeading';
import Gallery from '../Gallery';

import CategoryService from '../../services/CategoryService';
import BrandService from '../../services/BrandService';

function ProductForm({ createFn, updateProduct, updateFn, state }) {
	const { getBrands } = BrandService();
	const { getCategories } = CategoryService();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [images, setImages] = useState([]);
	const [price, setPrice] = useState('');
	const [salePrice, setSalePrice] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [brandId, setBrandId] = useState('');
	const [length, setLength] = useState('');
	const [width, setWidth] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [remainingAmount, setRemainingAmount] = useState('');

	const [brandList, setBrandList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [isMultiSelectable, setIsMultiSelectable] = useState(false);

	const clearAllFields = () => {
		setName('');
		setImage('');
		setDescription('');
		setBrandId('');
		setCategoryId('');
		setPrice('');
		setSalePrice('');
		setLength('');
		setWidth('');
		setHeight('');
		setWeight('');
		setImages([]);
		setRemainingAmount('');
	};

	const fetchCategories = async () => {
		try {
			const data = await getCategories();
			setCategoryList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchBrands = async () => {
		try {
			const data = await getBrands();
			setBrandList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const [errorMessage, setErrorMessage] = useState('');
	const [showModal, setShowModal] = state;
	const [showGalleryModal, setShowGalleryModal] = useState(false);

	const modal = useRef();

	const formSubmitHandler = (e) => {
		try {
			e.preventDefault();
         let imageIdsList = images.map(image => image.id);

			if (!updateProduct)
				createFn(
					name,
					description,
					price,
					salePrice,
					image?.id,
					categoryId,
					brandId,
					length,
					width,
					height,
					weight,
               imageIdsList,
					remainingAmount
				);
			else
				updateFn(
					updateProduct?.id,
					name,
					description,
					price,
					salePrice,
					image?.id,
					categoryId,
					brandId,
					length,
					width,
					height,
					weight,
               imageIdsList,
					remainingAmount
				);
			setShowModal(false);
			clearAllFields();
		} catch (error) {
			console.error(error);
			setErrorMessage('Đã có lỗi xảy ra.');
		}
	};

	useEffect(() => {
		fetchBrands();
		fetchCategories();

		if (updateProduct) {
			setName(updateProduct.name ?? '');
			setImage(updateProduct.image ?? '');
			setDescription(updateProduct.description ?? '');
			setPrice(updateProduct.price ?? '');
			setSalePrice(updateProduct.salePrice ?? '');
			setCategoryId(updateProduct.categoryId ?? '');
			setBrandId(updateProduct.brandId ?? '');
			setLength(updateProduct.length ?? '');
			setWidth(updateProduct.width ?? '');
			setHeight(updateProduct.height ?? '');
			setWeight(updateProduct.weight ?? '');
         setImages(updateProduct.gallery ?? []);
			setRemainingAmount(updateProduct.remainingAmount ?? '');
		} else clearAllFields();

		const handleClickOutside = (event) => {
			if (modal.current && !modal.current.contains(event.target)) {
				setShowModal(false);
            setImages([]);
            setImage('');
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [updateProduct, showModal]);

	return (
		<div>
			{showModal && (
				<div className="fixed w-full h-full top-0 left-0 flex justify-center items-center z-10 backdrop-brightness-75">
					<div
						ref={modal}
						className="w-[800px] max-h-[90vh] overflow-auto bg-white p-14 py-10 border rounded-md my-6 text-center shadow-2xl"
					>
						<DecoratedHeading
							content={
								updateProduct
									? 'Chỉnh sửa sản phẩm'
									: 'Thêm sản phẩm mới'
							}
						/>
						<div className="mt-10 text-left">
							{/* Error message */}
							<div className="mb-5">
								<span
									className={
										errorMessage &&
										'border rounded border-red-400 bg-red-50 text-red-500 p-1.5 px-2.5'
									}
								>
									{errorMessage}
								</span>
							</div>

							<form
								method="post"
								onSubmit={(e) => {
									formSubmitHandler(e);
									clearAllFields();
								}}
							>
								{/* Form fields */}
								<div className="mb-4">
									<label
										htmlFor="name"
										className="text-sm font-bold"
									>
										Tên sản phẩm
									</label>
									<input
										id="name"
										type="text"
										name="name"
										placeholder="Nhập tên sản phẩm"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
											setErrorMessage('');
										}}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>
								{/* Gallery modal */}
								<Gallery
									isSelectable={true}
									setSelectedImage={setImage}
									selectedImage={image}
									isMultiSelectable={isMultiSelectable}
									setIsMultiSelectable={setIsMultiSelectable}
									selectedImages={images}
									setSelectedImages={setImages}
									state={[
										showGalleryModal,
										setShowGalleryModal,
									]}
								/>
								<div className="mb-4">
									<label
										htmlFor="image"
										className="text-sm font-bold"
									>
										Ảnh sản phẩm
									</label>

									<div>
										<button
											id="image"
											name="imageId"
											className="min-h-32 min-w-32 bg-gray-50 hover:bg-gray-200 duration-150 border border-gray-300 rounded overflow-hidden"
											onClick={(e) => {
												e.preventDefault();
												setShowGalleryModal(true);
											}}
										>
											{image?.thumbnailPath ? (
												<img loading="lazy"
													className="max-h-44 rounded hover:brightness-75 duration-150"
													src={
														process.env
															.REACT_APP_BACKEND_SERVER +
														image.thumbnailPath
													}
												/>
											) : (
												<FontAwesomeIcon
													icon={faPlus}
												/>
											)}
										</button>
										{image && (
											<p className="text-xs mt-0.5 text-gray-400 italic">
												Click vào hình để chọn ảnh khác.
											</p>
										)}
									</div>
								</div>
								<div className="mb-4">
									<label
										htmlFor="images"
										className="text-sm font-bold"
									>
										Thư viện ảnh
									</label>

									<div className="grid grid-cols-5 gap-2">
										{images &&
											images.map((image, index) => (
												<div
													key={index}
													className="relative"
												>
													<img loading="lazy"
														className="max-h-44 aspect-square rounded object-cover"
														src={
															process.env
																.REACT_APP_BACKEND_SERVER +
															image.thumbnailPath
														}
													/>
													<div
														className="absolute w-5 h-5 rounded-full top-1.5 right-1.5 cursor-pointer hover:bg-red-600 bg-red-500 flex justify-center items-center text-white text-xs font-bold"
														onClick={(e) =>
															setImages(
																images.filter(
																	(img) =>
																		img !==
																		image
																)
															)
														}
													>
														<FontAwesomeIcon
															icon={faClose}
														/>
													</div>
												</div>
											))}
										<button
											id="images"
											name="gallery"
											className="min-h-32 min-w-32 bg-gray-50 hover:bg-gray-200 duration-150 border border-gray-300 rounded overflow-hidden"
											onClick={(e) => {
												e.preventDefault();
												setIsMultiSelectable(true);
												setShowGalleryModal(true);
											}}
										>
											<FontAwesomeIcon icon={faPlus} />
										</button>
									</div>
								</div>
								<div className="mb-4">
									<label
										htmlFor="price"
										className="text-sm font-bold"
									>
										Giá
									</label>
									<input
										id="price"
										type="number"
										min={0}
										step={1}
										name="price"
										placeholder="Nhập giá sản phẩm"
										value={price}
										onChange={(e) => {
											setPrice(e.target.value);
											setErrorMessage('');
										}}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="salePrice"
										className="text-sm font-bold"
									>
										Giá khuyến mãi
									</label>
									<input
										id="salePrice"
										type="number"
										min={0}
										step={1}
										name="salePrice"
										placeholder="Nhập giá khuyến mãi"
										value={salePrice}
										onChange={(e) => {
											setSalePrice(e.target.value);
											setErrorMessage('');
										}}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="description"
										className="text-sm font-bold"
									>
										Thông tin
									</label>
									<textarea
										id="description"
										name="description"
										onChange={(e) => {
											setDescription(e.target.value);
											setErrorMessage('');
										}}
										value={description}
										rows={4}
										placeholder="Nhập tên thông tin sản phẩm"
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									></textarea>
								</div>
								<div className="mb-4">
									<label
										htmlFor="brand"
										className="text-sm font-bold"
									>
										Thương hiệu
									</label>
									<select
										id="brand"
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
										defaultValue={
											updateProduct?.brand?.id ??
											'DEFAULT'
										}
										onChange={(e) => {
											setBrandId(e.target.value);
											setErrorMessage('');
										}}
									>
										<option disabled value="DEFAULT">
											Vui lòng chọn thương hiệu
										</option>
										{brandList.map((brand) => (
											<option
												key={brand.id}
												value={brand.id}
											>
												{brand.name}
											</option>
										))}
									</select>
								</div>

								<div className="mb-4">
									<label
										htmlFor="category"
										className="text-sm font-bold"
									>
										Dòng sản phẩm
									</label>
									<select
										id="category"
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
										defaultValue={
											updateProduct?.category?.id ??
											'DEFAULT'
										}
										onChange={(e) => {
											setCategoryId(e.target.value);
											setErrorMessage('');
										}}
									>
										<option disabled value="DEFAULT">
											Vui lòng chọn dòng sản phẩm
										</option>
										{categoryList.map((category) => (
											<option
												key={category.id}
												value={category.id}
											>
												{category.name}
											</option>
										))}
									</select>
								</div>
								<p className="text-sm font-bold">
									Thông tin bổ sung
								</p>
								<div className="grid grid-cols-4 gap-2">
									<div className="mb-4">
										<label
											htmlFor="price"
											className="text-sm"
										>
											Dài (m)
										</label>
										<input
											id="length"
											type="number"
											min={0}
											step={0.01}
											name="length"
											placeholder="Nhập chiều dài"
											value={length}
											onChange={(e) => {
												setLength(e.target.value);
												setErrorMessage('');
											}}
											className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="width"
											className="text-sm"
										>
											Rộng (m)
										</label>
										<input
											id="width"
											type="number"
											min={0}
											step={0.01}
											name="width"
											placeholder="Nhập chiều rộng"
											value={width}
											onChange={(e) => {
												setWidth(e.target.value);
												setErrorMessage('');
											}}
											className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="height"
											className="text-sm"
										>
											Cao (m)
										</label>
										<input
											id="height"
											type="number"
											min={0}
											step={0.01}
											name="height"
											placeholder="Nhập chiều cao"
											value={height}
											onChange={(e) => {
												setHeight(e.target.value);
												setErrorMessage('');
											}}
											className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="weight"
											className="text-sm"
										>
											Cân nặng (kg)
										</label>
										<input
											id="weight"
											type="number"
											min={0}
											step={0.01}
											name="weight"
											placeholder="Nhập cân nặng"
											value={weight}
											onChange={(e) => {
												setWeight(e.target.value);
												setErrorMessage('');
											}}
											className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
										/>
									</div>
								</div>
								<div className="mb-4">
									<label
										htmlFor="remainingAmount"
										className="text-sm font-bold"
									>
										Số lượng hàng
									</label>
									<input
										id="remainingAmount"
										type="number"
										min={0}
										step={1}
										name="remainingAmount"
										placeholder="Nhập số lượng hàng"
										value={remainingAmount}
										onChange={(e) => {
											setRemainingAmount(e.target.value);
											setErrorMessage('');
										}}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>

								{/* Submit button */}
								<div className="flex gap-2 justify-center">
									{updateProduct ? (
										<button
											type="submit"
											className="border border-green-500 rounded-md bg-green-500 hover:bg-green-600 duration-150 text-white p-2 px-3"
										>
											Cập nhật
										</button>
									) : (
										<button
											type="submit"
											className="border border-blue-500 rounded-md bg-blue-500 hover:bg-blue-600 duration-150 text-white p-2 px-3"
										>
											Thêm
										</button>
									)}
									<button
										onClick={() => setShowModal(false)}
										className="bg-gray-200 hover:bg-gray-300 border border-gray-300 duration-150 p-2 px-3 rounded-md"
									>
										Hủy
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductForm;
