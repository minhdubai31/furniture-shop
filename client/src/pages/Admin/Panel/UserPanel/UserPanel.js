import { useEffect, useState } from 'react';

import useAuth from '../../../../hooks/useAuth';

import DataTable from '../../../../components/DataTable';
import DeleteButton from '../../../../components/DeleteButton';
import ChangeUserRoleButton from '../../../../components/ChangeUserRoleButton';

import UserService from '../../../../services/UserService';

function UserPanel() {
	useEffect(() => {
		document.title = 'Quản lý người dùng';
	});

	const { getUsers, deleteUser, changeUserRole  } = UserService();

	const [users, setUsers] = useState([]);
	const { auth } = useAuth();

	const fetchUsers = async () => {
		try {
			setUsers(await getUsers());
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUserHandler = async (id) => {
		try {
			await deleteUser(id);
			fetchUsers();
		} catch (error) {
			console.log(error);
		}
	};

	const changeUserRoleHandler = async (id, role) => {
		try {
			await changeUserRole(id, role)
			fetchUsers();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsers();
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
				<div className='flex justify-between'>
					{item.role}
					{auth.username != item.username && (
						<ChangeUserRoleButton
							item={item}
							changeRolefn={changeUserRoleHandler}
						/>
					)}
				</div>
			),
			resize: true,
		},
		{
			renderCell: (item) =>
				auth?.username != item.username ? (
					<DeleteButton item={item} deletefn={deleteUserHandler} />
				) : (
					<span className="text-blue-500 text-xs">Bạn</span>
				),
		},
	];

	return (
		<DataTable
			tableTitle="Danh sách người dùng"
			tableData={users}
			tableColums={tableColums}
			searchBy={{ text: 'tên', field: 'name' }}
			templateCol={`repeat(${tableColums.length}, auto)`}
		/>
	);
}

export default UserPanel;
