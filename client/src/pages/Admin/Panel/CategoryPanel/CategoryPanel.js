import { useEffect, useState } from 'react';
import DataTable from '../../../../components/DataTable';
import CategoryForm from '../../../../components/CategoryForm';
import DeleteButton from '../../../../components/DeleteButton';
import EditButton from '../../../../components/EditButton';

import CategoryService from '../../../../services/CategoryService';

function CategoryPanel() {
	useEffect(() => {
		document.title = 'Quản lý danh mục';
	});

	const { getCategories, createCategory, deleteCategory, updateCategory } =
		CategoryService();
	const [categories, setCategories] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editingCategory, setEditingCategory] = useState();

	const fetchCategories = async () => {
		try {
			const data = await getCategories();
			setCategories(data);
		} catch (error) {
			console.log(error);
		}
	};

	const createCategoryHandler = async () => {
		await createCategory();
		fetchCategories();
	};

	const updateCategoryHandler = async (id, name) => {
		await updateCategory(id, name);
		fetchCategories();
	};

	const deleteCategoryHandler = async (id) => {
		try {
			await deleteCategory(id);
			fetchCategories();
		} catch (error) {
			console.log(error);
		}
	};

	const tableColums = [
		{
			label: 'Tên danh mục',
			renderCell: (item) => item.name,
			resize: true,
		},
		{
			label: 'Sản phẩm con',
			renderCell: (item) => (
				<ul className="list-decimal list-inside">
					{item.products.map((product) => (
						<li key={product.id}>{product.name}</li>
					))}
				</ul>
			),
			resize: true,
		},
		{
			renderCell: (item) => (
				<div className="flex gap-2">
					<EditButton
						showModalFn={setShowModal}
						item={item}
						setEditingFn={setEditingCategory}
					/>
					<DeleteButton
						item={item}
						deletefn={deleteCategoryHandler}
						description="Việc xóa danh mục sẽ chuyển các sản phẩm thuộc danh mục này sang sản phẩm không có danh mục. Bạn chắc chắn muốn tiếp tục?"
					/>
				</div>
			),
		},
	];

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div>
			<CategoryForm
				state={[showModal, setShowModal]}
				createFn={createCategoryHandler}
				updateFn={updateCategoryHandler}
				updateCategory={editingCategory}
			/>
			<DataTable
				tableTitle="Danh sánh danh mục"
				tableData={categories}
				tableColums={tableColums}
				searchBy={{ text: 'tên danh mục', field: 'name' }}
				createFn={() => {
					setEditingCategory();
					setShowModal(true);
				}}
				templateCol={'auto minmax(0, 1fr) auto'}
			/>
		</div>
	);
}

export default CategoryPanel;
