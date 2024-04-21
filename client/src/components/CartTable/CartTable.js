import { useEffect, useState, useContext } from 'react';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { CompactTable } from '@table-library/react-table-library/compact';

import CartContext from '../../context/CartProvider';
import { Link } from 'react-router-dom';

function CartTable({ tableTitle, tableData, tableColums, templateCol }) {
	const { setCartNumber } = useContext(CartContext);

	// Set table theme
	const theme = useTheme([
		getTheme(),
		{
			Table:
				templateCol &&
				`--data-table-library_grid-template-columns: ${templateCol}`,
			Cell: `padding: 8px 12px;`,
			Cell: `
				&:not(:last-of-type) {
				}
		 	`,
		},
	]);

	// Set table data
	let data = { nodes: tableData };

	let totalPrice = tableData.reduce(
		(prev, curr) =>
			prev + (curr.product.salePrice ?? curr.product.price) * curr.amount,
		0
	);

	let totalAmount = data.nodes.reduce((prev, curr) => prev + curr.amount, 0);

	useEffect(() => {
		totalAmount && setCartNumber(totalAmount);
	});

	return (
		<>
			{tableTitle && (
				<h1 className="text-2xl font-bold upper mb-5">{tableTitle}</h1>
			)}
			<div className="border border-black/25 rounded-md overflow-hidden">
				<CompactTable
					layout={{ custom: true }}
					columns={tableColums}
					data={data}
					theme={theme}
				/>
			</div>
			<p className="text-xs mt-1 ms-2">Số lượng: {totalAmount}</p>
			<div className="flex flex-col items-end">
				<p className="">
					Tổng thành tiền:{' '}
					<span className="text-xl">
						{totalPrice.toLocaleString('vi-VN')}đ
					</span>
				</p>
				<Link
					to={"/payment"}
               state={tableData}
					className="mt-5 text-center p-2 rounded-md bg-black text-white border border-zinc-800 hover:bg-zinc-600 duration-150"
				>
					Đặt hàng
				</Link>
			</div>
		</>
	);
}

export default CartTable;
