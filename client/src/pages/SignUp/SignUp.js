import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecoratedHeading from '../../components/DecoratedHeading';
import { ReactComponent as GoogleLogo } from '../../assets/logo/GoogleLogo.svg';
import { ReactComponent as FacebookLogo } from '../../assets/logo/FacebookLogo.svg';
import { ReactComponent as GithubLogo } from '../../assets/logo/GithubLogo.svg';

const SIGNUP_URL = '/api/auth/register';

function Login() {
	useEffect(() => {
		document.title = 'Đăng ký';
	}, []);

	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthday, setBirthday] = useState('');

	const loginFields = [
		{
			id: 'name',
			name: 'name',
			type: 'text',
			label: 'Tên của bạn',
			placeholder: 'Nhập tên của bạn',
			value: name,
			changeValue: setName,
		},
		{
			id: 'username',
			name: 'username',
			type: 'text',
			label: 'Tên đăng nhập',
			placeholder: 'Nhập tên đăng nhập',
			value: username,
			changeValue: setUsername,
		},
		{
			id: 'email',
			name: 'email',
			type: 'email',
			label: 'Email',
			placeholder: 'Nhập email',
			value: email,
			changeValue: setEmail,
		},
		{
			id: 'password',
			name: 'password',
			type: 'password',
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
			value: password,
			changeValue: setPassword,
		},
		{
			id: 'birthday',
			name: 'birthday',
			type: 'date',
			label: 'Ngày sinh',
			value: birthday,
			changeValue: setBirthday,
		},
	];

	const signupSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				SIGNUP_URL,
				JSON.stringify({
					name,
					username,
					email,
					password,
					birthday,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const accessToken = response?.data?.token;
			const refreshToken = response?.data?.refresh_token;
			const role = response?.data?.role;
			const resName = response?.data?.name;
			const resUsername = response?.data?.username;
			
			localStorage.setItem('essayAccessToken', accessToken);
			localStorage.setItem('essayRefreshToken', refreshToken);

			setAuth({ name: resName, role, username: resUsername });
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Header />
			<div className="flex justify-center bg-gray-100">
				<div className="w-[500px] bg-white p-14 py-16 border rounded-md my-6 text-center">
					<DecoratedHeading content="Đăng ký" />
					<div className="mt-10 text-left">
						<form method="post" onSubmit={signupSubmitHandler}>
							{/* Login fields */}
							{loginFields.map((field) => (
								<div key={field.id} className="mb-4">
									<label
										htmlFor={field.id}
										className="text-sm font-bold"
									>
										{field.label + ':'}
									</label>
									<input
										id={field.id}
										type={field.type}
										name={field.name}
										placeholder={field.placeholder}
										value={field.value}
										onChange={(e) =>
											field.changeValue(e.target.value)
										}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>
							))}

							{/* Sign up button */}
							<div className="flex justify-center">
								<button
									type="submit"
									className="bg-[#333] hover:bg-zinc-600 duration-200 text-white p-2 px-3 rounded-md"
								>
									Đăng ký
								</button>
							</div>
						</form>
						<div className="text-center">
							<p className="my-6 text-xs text-gray-400">hoặc</p>
							<div className="text-3xl flex gap-5 justify-center">
								<Link to={''}>
									<GoogleLogo
										width={44}
										height={44}
										className="hover:bg-gray-100 p-1.5 rounded-full duration-200"
									/>
								</Link>
								<Link to={''}>
									<FacebookLogo
										width={44}
										height={44}
										className="hover:bg-gray-100 p-1.5 rounded-full duration-200"
									/>
								</Link>
								<Link to={''}>
									<GithubLogo
										width={44}
										height={44}
										className="hover:bg-gray-100 p-1.5 rounded-full duration-200"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Login;
