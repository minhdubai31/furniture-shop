import useAxios from '../hooks/useAxios';
import { JsogService } from 'jsog-typescript';
import useAuth from '../hooks/useAuth';

const USERS_API_URL = '/api/user/';

function UserService() {
	const axios = useAxios();
	const JSOG = new JsogService();
	const { auth } = useAuth();

	const getUsers = async () => {
		const response = await axios.get(USERS_API_URL);
		return response.data;
	};

	const getUser = async (id) => {
		const response = await axios.get(USERS_API_URL + id);
		return JSOG.deserialize(response.data);
	};

	const updatePhoneNumber = async (phoneNumber) => {
		const response = await axios.patch(USERS_API_URL + auth.id, {
			phoneNumber,
		});
		return JSOG.deserialize(response.data);
	};

	const getCurrUser = async () => {
		const response = await axios.get(USERS_API_URL + auth.id);
		return JSOG.deserialize(response.data);
	};

	const deleteUser = async (id) => {
		await axios.delete(USERS_API_URL + id);
	};

	const changeUserRole = async (id, role) => {
		await axios.patch(USERS_API_URL + id, { role });
	};

	const addAddress = async (province, district, commune, addressDetail) => {
		await axios.post(USERS_API_URL + auth.id + '/address', {
			province,
			district,
			commune,
			addressDetail,
		});
	};

	const deleteAddress = async (id) => {
		await axios.delete(USERS_API_URL + auth.id + '/address?id=' + id);
	};

	return {
		getUsers,
		getUser,
		addAddress,
		updatePhoneNumber,
		deleteAddress,
		getCurrUser,
		deleteUser,
		changeUserRole,
	};
}

export default UserService;
