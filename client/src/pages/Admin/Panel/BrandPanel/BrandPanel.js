import { useEffect, useState } from 'react';

import DataTable from '../../../../components/DataTable';
import useAxios from '../../../../hooks/useAxios';
import DeleteButton from '../../../../components/DeleteButton';

const BRAND_API_URL = '/api/brand/';

function BrandPanel() {
	const [brandsData, setBrandsData] = useState([]);
	const axios = useAxios();

	const fetchBrandsData = async () => {
		try {
			const response = await axios.get(BRAND_API_URL);
			setBrandsData(response.data);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteBrandHandler = async (id) => {
		try {
			await axios.delete(BRAND_API_URL + id);
			fetchBrandsData();
		} catch (error) {
			console.log(error);
		}
	};

	const createBrandHandler = async () => {
		try {
			await axios.post(BRAND_API_URL, JSON.stringify({}))
			fetchBrandsData();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchBrandsData();
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
					src={process.env.REACT_APP_BACKEND_SERVER + item.logo?.path}
				/>
			),
			resize: true,
		},
		{
			label: 'Thông tin',
			renderCell: (item) => item?.description,
			resize: true,
		},
		{
			renderCell: (item) => (
				<DeleteButton item={item} deletefn={deleteBrandHandler} />
			),
		},
	];

	return (
		<DataTable
			tableTitle="Danh sách thương hiệu"
			tableData={brandsData}
			tableColums={tableColums}
			searchBy={{ text: 'tên thương hiệu', field: 'name' }}
			templateCol={`minmax(0, 1fr) minmax(0, 150px) auto auto`}
		/>
	);
}

export default BrandPanel;
