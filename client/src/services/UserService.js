import useAxios from '../hooks/useAxios';

const USERS_API_URL = '/api/user/';

function UserService() {
	const axios = useAxios();

	const getUsers = async () => {
		const response = await axios.get(USERS_API_URL);
      return response.data;
	};

   const deleteUser = async (id) => {
      await axios.delete(USERS_API_URL + id);
   }

   const changeUserRole = async (id, role) => {
      await axios.patch(USERS_API_URL + id, { role });
   }

	return { getUsers, deleteUser, changeUserRole };
}

export default UserService;
