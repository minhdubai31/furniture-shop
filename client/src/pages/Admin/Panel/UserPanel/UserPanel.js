import { useEffect, useState } from 'react';

import useAxios from '../../../../hooks/useAxios';
import useAuth from '../../../../hooks/useAuth';

import DataTable from '../../../../components/DataTable';
import DeleteButton from '../../../../components/DeleteButton';
import ChangeUserRoleButton from '../../../../components/ChangeUserRoleButton';

const USERS_API_URL = '/api/user/';

function UserPanel() {
	const [usersdata, setUsersdata] = useState([]);
	const axios = useAxios();
	const { auth } = useAuth();

	const fetchUsersdata = async () => {
		try {
			const response = await axios.get(USERS_API_URL);
			setUsersdata(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUser = async (userId) => {
		try {
			await axios.delete(USERS_API_URL + userId);
			fetchUsersdata();
		} catch (error) {
			console.log(error);
		}
	};

	const changeUserRole = async (userId, role) => {
		try {
			await axios.patch(USERS_API_URL + userId, { role });
			fetchUsersdata();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsersdata();
	}, []);

	const tableColums = [
		{ label: 'Tên', renderCell: (item) => item.name, resize: true },
		{
			label: 'Username',
			renderCell: (item) => item.username,
			resize: true,
		},
		{ label: 'Email', renderCell: (item) => item.email, resize: true },
		{
			label: 'Số điện thoại',
			renderCell: (item) => item.phoneNumber ?? '-',
			resize: true,
		},
		{
			label: 'Quyền',
			renderCell: (item) => (
				<>
					{item.role}
					{auth.username != item.username && (
						<ChangeUserRoleButton
							item={item}
							changeRolefn={changeUserRole}
						/>
					)}
				</>
			),
			resize: true,
		},
		{
			renderCell: (item) =>
				auth?.username != item.username ? (
					<DeleteButton item={item} deletefn={deleteUser} />
				) : (
					<span className="text-blue-500 text-xs">Bạn</span>
				),
		},
	];

	return (
		<DataTable
			tableTitle="Danh sách người dùng"
			tableData={usersdata}
			tableColums={tableColums}
			searchBy={{ text: 'tên', field: 'name' }}
			templateCol={`repeat(${tableColums.length}, auto)`}
		/>
	);
}

export default UserPanel;
