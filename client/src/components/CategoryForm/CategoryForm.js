import { useEffect, useRef, useState } from 'react';

import DecoratedHeading from '../DecoratedHeading';

function CategoryForm({ state, createFn, updateFn, updateCategory }) {
	const [showModal, setShowModal] = state;
	const [name, setName] = useState('');

	const modal = useRef();
	const formSubmitHandler = (e) => {
		e.preventDefault();
		!updateCategory ? createFn(name) : updateFn(updateCategory.id, name);

      setShowModal(false);
	};

	useEffect(() => {
		updateCategory ? setName(updateCategory.name) : setName('');

		const handleClickOutside = (event) => {
			if (modal.current && !modal.current.contains(event.target)) {
				setShowModal(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [updateCategory]);

	return (
		<div>
			{showModal && (
				<div className="fixed w-full h-full top-0 left-0 flex justify-center items-center z-10 backdrop-brightness-75">
					<div
						ref={modal}
						className="w-[500px] bg-white p-14 py-10 border rounded-md my-6 text-center shadow-2xl"
					>
						<DecoratedHeading
							content={
								updateCategory
									? 'Chỉnh sửa danh mục'
									: 'Thêm danh mục mới'
							}
						/>
						<div className="mt-10 text-left">
							<form
								method="post"
								onSubmit={(e) => {
									formSubmitHandler(e);
									setName('');
								}}
							>
								{/* Form fields */}
								<div className="mb-4">
									<label
										htmlFor="name"
										className="text-sm font-bold"
									>
										Tên danh mục
									</label>
									<input
										id="name"
										type="text"
										name="name"
										placeholder="Nhập tên thương hiệu"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
										className="w-full border border-gray-300 p-2.5 rounded block bg-gray-50 focus:bg-white !outline-none duration-200"
									/>
								</div>

								{/* Submit button */}
								<div className="flex gap-2 justify-center">
									{updateCategory ? (
										<button
											type="submit"
											className="border border-green-500 rounded-md bg-green-500 hover:bg-green-600 duration-150 text-white p-2 px-3"
										>
											Cập nhật
										</button>
									) : (
										<button
											type="submit"
											className="border border-blue-500 rounded-md bg-blue-500 hover:bg-blue-600 duration-150 text-white p-2 px-3"
										>
											Thêm
										</button>
									)}
									<button
										onClick={() => setShowModal(false)}
										className="bg-gray-200 hover:bg-gray-300 border border-gray-300 duration-150 p-2 px-3 rounded-md"
									>
										Hủy
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CategoryForm;
