import { useEffect, useState } from 'react';
import DataTable from '../../../../components/DataTable';

import ProductService from '../../../../services/ProductService';

function ProductPanel() {
	const { getProducts } = ProductService();
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		try {
			const data = await getProducts();
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	const tableColums = [
		{
			label: 'Tên sản phẩm',
			renderCell: (item) => item.name,
		},
	];

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<DataTable tableData={products} tableColums={tableColums} />
		</div>
	);
}

export default ProductPanel;
