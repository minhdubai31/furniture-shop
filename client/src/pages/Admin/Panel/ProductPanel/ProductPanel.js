import { useEffect, useState } from 'react';
import DataTable from '../../../../components/DataTable';
import DeleteButton from '../../../../components/DeleteButton';
import EditButton from '../../../../components/EditButton';

import ProductService from '../../../../services/ProductService';
import ProductForm from '../../../../components/ProductForm/ProductForm';

function ProductPanel() {
	const {
		getProducts,
		createProduct,
		updateProduct,
		deleteProduct,
		updateProductGallery,
	} = ProductService();
	const [products, setProducts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState();

	const fetchProducts = async () => {
		try {
			const data = await getProducts();
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	const createProductHandler = async (
		name,
		description,
		price,
		salePrice,
		imageId,
		categoryId,
		brandId,
		length,
		width,
		height,
		weight,
		imageIdsList,
		remainingAmount
	) => {
		try {
			let createdProduct = await createProduct(
				name,
				description,
				price,
				salePrice,
				imageId,
				categoryId,
				brandId,
				length,
				width,
				height,
				weight,
				remainingAmount
			);
			console.log(createdProduct);
			await updateProductGallery(createdProduct.data?.id, imageIdsList);
			fetchProducts();
		} catch (error) {
			console.log(error);
		}
	};

	const updateProductHandler = async (
		id,
		name,
		description,
		price,
		salePrice,
		imageId,
		categoryId,
		brandId,
		length,
		width,
		height,
		weight,
		imageIdsList,
		remainingAmount
	) => {
		try {
			await updateProduct(
				id,
				name,
				description,
				price,
				salePrice,
				imageId,
				categoryId,
				brandId,
				length,
				width,
				height,
				weight,
				remainingAmount
			);
			await updateProductGallery(id, imageIdsList);
			fetchProducts();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProductHandler = async (id) => {
		try {
			await deleteProduct(id);
			fetchProducts();
		} catch (error) {
			console.log(error);
		}
	};

	const tableColums = [
		{
			label: 'Tên sản phẩm',
			renderCell: (item) => item.name,
			resize: true,
		},
		{
			label: 'Ảnh sản phẩm',
			renderCell: (item) => (
				<img loading="lazy"
					className="max-h-40 rounded-sm border aspect-square object-cover"
					src={
						process.env.REACT_APP_BACKEND_SERVER +
						item.image?.thumbnailPath
					}
				/>
			),
			resize: true,
		},
		{
			label: 'Thông tin',
			renderCell: (item) => item.description,
			resize: true,
		},
		{
			label: 'Giá',
			renderCell: (item) => (
				<div>
					<p>
						{item.price &&
							`Giá gốc: ${item.price?.toLocaleString('vi-VN')}đ`}
					</p>
					<p>
						{item.salePrice &&
							`Giá khuyến mãi: ${item.salePrice?.toLocaleString(
								'vi-VN'
							)}đ`}
					</p>
				</div>
			),
			resize: true,
		},
		{
			label: 'Danh mục',
			renderCell: (item) => item.category?.name,
			resize: true,
		},
		{
			label: 'Thương hiệu',
			renderCell: (item) => item.brand?.name,
			resize: true,
		},
		{
			renderCell: (item) => (
				<div className="flex gap-2">
					<EditButton
						showModalFn={setShowModal}
						item={item}
						setEditingFn={setEditingProduct}
					/>
					<DeleteButton
						item={item}
						deletefn={deleteProductHandler}
						description="Việc này sẽ xóa vĩnh viễn sản phẩm trên. Bạn chắc chắn muốn tiếp tục?"
					/>
				</div>
			),
		},
	];

	useEffect(() => {
		document.title = 'Quản lý sản phẩm';
		fetchProducts();
	}, []);

	return (
		<div>
			<ProductForm
				state={[showModal, setShowModal]}
				createFn={createProductHandler}
				updateFn={updateProductHandler}
				updateProduct={editingProduct}
			/>
			<DataTable
				tableTitle="Danh sách sản phẩm"
				tableData={products}
				tableColums={tableColums}
				searchBy={{ text: 'tên sản phẩm', field: 'name' }}
				createFn={() => {
					setEditingProduct();
					setShowModal(true);
				}}
				templateCol={`auto minmax(0, 150px) minmax(0, 1fr) auto auto auto auto`}
			/>
		</div>
	);
}

export default ProductPanel;
