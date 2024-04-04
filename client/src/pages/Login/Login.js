import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecoratedHeading from '../../components/DecoratedHeading';
import { ReactComponent as GoogleLogo } from '../../assets/logo/GoogleLogo.svg';
import { ReactComponent as FacebookLogo } from '../../assets/logo/FacebookLogo.svg';
import { ReactComponent as GithubLogo } from '../../assets/logo/GithubLogo.svg';

import AuthService from '../../services/AuthService';

function Login() {
	useEffect(() => {
		document.title = 'Đăng nhập';
	}, []);

	const { login } = AuthService();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const loginFields = [
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
			id: 'password',
			name: 'password',
			type: 'password',
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
			value: password,
			changeValue: setPassword,
		},
	];

	const loginHandler = async (e) => {
		e.preventDefault();

		try {
			await login(username, password);
		} catch (err) {
			console.log(err);
			if (!err.response) setErrorMessage('Không thể kết nối với máy chủ');
			else setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác');
		}
	};

	return (
		<div>
			<Header />
			<div className="flex justify-center bg-gray-100">
				<div className="w-[500px] bg-white p-14 py-16 border rounded-md my-6 text-center">
					<DecoratedHeading content="Đăng nhập" />
					<div className="mt-10 text-left">
						{/* Error message */}
						<div className="mb-5">
							<span
								className={
									errorMessage &&
									'border rounded border-red-400 bg-red-50 text-red-500 p-1.5 px-2.5'
								}
							>
								{errorMessage}
							</span>
						</div>

						<form method="post" onSubmit={loginHandler}>
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
										onChange={(e) => {
											field.changeValue(e.target.value);
											setErrorMessage('');
										}}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>
							))}

							{/* Forget password */}
							<div className="flex  mb-4 justify-end text-xs text-blue-500 hover:underline">
								<Link to={''}>Bạn quên mật khẩu?</Link>
							</div>
							{/* Login button */}
							<div className="flex justify-center">
								<button
									type="submit"
									className="bg-[#333] hover:bg-zinc-600 duration-200 text-white p-2 px-3 rounded-md"
								>
									Đăng nhập
								</button>
							</div>
						</form>
						<div className="text-center">
							<p className="my-6 text-xs text-gray-400">hoặc</p>
							<div className="text-3xl flex gap-5 justify-center">
								<a href={'http://localhost:8080/oauth2/authorization/google'}>
									<GoogleLogo
										width={44}
										height={44}
										className="hover:bg-gray-100 p-1.5 rounded-full duration-200"
									/>
								</a>
								<a href={'http://localhost:8080/oauth2/authorization/facebook'}>
									<FacebookLogo
										width={44}
										height={44}
										className="hover:bg-gray-100 p-1.5 rounded-full duration-200"
									/>
								</a>
								<a href={'http://localhost:8080/oauth2/authorization/github'}>
									<GithubLogo
										width={44}
										height={44}
										className="hover:bg-gray-100 p-1.5 rounded-full duration-200"
									/>
								</a>
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
