import { Link } from 'react-router-dom';
import { ReactComponent as GoogleLogo } from '../../../assets/logo/GoogleLogo.svg';
import { ReactComponent as FacebookLogo } from '../../../assets/logo/FacebookLogo.svg';
import { ReactComponent as GithubLogo } from '../../../assets/logo/GithubLogo.svg';

import DecoratedHeading from '../../components/DecoratedHeading';

function Login() {
	const loginFields = [
		{
			id: 'name',
			name: 'name',
			type: 'text',
			label: 'Tên của bạn',
			placeholder: 'Nhập tên của bạn',
		},
		{
			id: 'username',
			name: 'username',
			type: 'text',
			label: 'Tên đăng nhập',
			placeholder: 'Nhập tên đăng nhập',
		},
		{
			id: 'email',
			name: 'email',
			type: 'email',
			label: 'Email',
			placeholder: 'Nhập email',
		},
		{
			id: 'password',
			name: 'password',
			type: 'password',
			label: 'Mật khẩu',
			placeholder: 'Nhập mật khẩu',
		},
	];

	return (
		<div className="flex justify-center bg-gray-100">
			<div className="w-[500px] bg-white p-14 py-16 border rounded-md my-6 text-center">
				<DecoratedHeading content="Đăng ký" />
				<div className="mt-10 text-left">
					<form method="post">
						{/* Login fields */}
						{loginFields.map((field) => (
							<div key={field.id} className="mb-4">
								<label
									htmlFor={field.id}
									className="text-sm font-bold"
								>
									{field.label + ":"}
								</label>
								<input
									id={field.id}
									type={field.type}
									name={field.name}
									placeholder={field.placeholder}
									className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
								/>
							</div>
						))}

						{/* Sign up button */}
						<div className="flex justify-center">
							<button className="bg-[#333] hover:bg-zinc-600 duration-200 text-white p-2 px-3 rounded-md">
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
	);
}

export default Login;
