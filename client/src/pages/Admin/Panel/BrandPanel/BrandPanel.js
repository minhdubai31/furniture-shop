import { useEffect, useState } from 'react';

import DataTable from '../../../../components/DataTable';
import DeleteButton from '../../../../components/DeleteButton';
import EditButton from '../../../../components/EditButton';
import BrandForm from '../../../../components/BrandForm';

import BrandService from '../../../../services/BrandService';

function BrandPanel() {
	useEffect(() => {
		document.title = 'Quản lý thương hiệu';
	});

	const { getBrands, createBrand, deleteBrand, updateBrand } = BrandService();

	const [brandsData, setBrandsData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editingBrand, setEditingBrand] = useState();

	const fetchBrands = async () => {
		try {
			setBrandsData(await getBrands());
		} catch (error) {
			console.log(error);
		}
	};

	const deleteBrandHandler = async (id) => {
		try {
			await deleteBrand(id);
			fetchBrands();
		} catch (error) {
			console.log(error);
		}
	};

	const createBrandHandler = async (name, logoImageId, description) => {
		try {
			await createBrand(name, logoImageId, description);
			fetchBrands();
		} catch (error) {
			console.log(error);
		}
	};

	const updateBrandHandler = async (id, name, logoImageId, description) => {
		try {
			await updateBrand(id, name, logoImageId, description);
			fetchBrands();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBrands();
	}, []);

	const tableColums = [
		{
			label: 'Tên thương hiệu',
			renderCell: (item) => item.name,
			resize: true,
		},
		{
			label: 'Logo',
			renderCell: (item) => (
				<img
					className="max-h-40 rounded-sm border"
					src={
						process.env.REACT_APP_BACKEND_SERVER +
						item.logo?.thumbnailPath
					}
				/>
			),
			resize: true,
		},
		{
			label: 'Thông tin',
			renderCell: (item) => (
				<p className="text-wrap">{item?.description}</p>
			),
			resize: true,
		},
		{
			renderCell: (item) => (
				<div className="flex gap-2">
					<EditButton
						showModalFn={setShowModal}
						item={item}
						setEditingFn={setEditingBrand}
					/>
					<DeleteButton
						item={item}
						deletefn={deleteBrandHandler}
						description="Việc xóa thương hiệu sẽ chuyển các sản phẩm thuộc thương hiệu này sang sản phẩm không có thương hiệu. Bạn chắc chắn muốn tiếp tục?"
					/>
				</div>
			),
		},
	];

	return (
		<>
			<BrandForm
				state={[showModal, setShowModal]}
				createFn={createBrandHandler}
				updateFn={updateBrandHandler}
				updateBrand={editingBrand}
			/>
			<DataTable
				tableTitle="Danh sách thương hiệu"
				tableData={brandsData}
				tableColums={tableColums}
				searchBy={{ text: 'tên thương hiệu', field: 'name' }}
				templateCol={`auto minmax(0, 150px) minmax(0, 1fr) auto`}
				createFn={() => {
					setShowModal(true);
					setEditingBrand();
				}}
			/>
		</>
	);
}

export default BrandPanel;
