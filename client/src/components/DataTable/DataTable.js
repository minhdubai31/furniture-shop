import { useState } from 'react';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import { Group, Pagination } from '@mantine/core';
import { CompactTable } from '@table-library/react-table-library/compact';
import '@mantine/core/styles.css';

function TableContainer({
	tableTitle,
	tableData,
	tableColums,
	searchBy,
	templateCol,
	createFn,
}) {
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
				border-right: 1px solid #dde2eb;
				}
		 	`,
		},
	]);

	// Search input
	const [search, setSearch] = useState('');
	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	// Set table data
	let data = { nodes: tableData };

	// Search in table
	data = {
		nodes: data.nodes.filter((item) =>
			item[searchBy.field]?.toLowerCase().includes(search.toLowerCase())
		),
	};

	// Configure the pagination
	const pagination = usePagination(data, {
		state: {
			page: 0,
			size: 10,
		},
	});

	return (
		<div className="bg-white p-6 py-8 rounded border">
			<h1 className="text-2xl font-bold upper mb-5">{tableTitle}</h1>
			<div className="flex gap-6">
				<div className="h-12 my-2 w-[300px] max-w-full px-4 rounded-md text-black bg-black/10 flex items-center justify-between">
					<input
						className="w-full h-12 bg-transparent placeholder:text-black/50 !outline-none"
						type="text"
						placeholder={'Tìm kiếm bằng ' + searchBy.text}
						onChange={handleSearch}
						value={search}
					/>
				</div>
				{createFn && (
					<button
						onClick={createFn}
						className="h-12 my-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-150"
					>
						Thêm mới
					</button>
				)}
			</div>
			<div className="border border-black/25 rounded-md overflow-hidden">
				<CompactTable
					layout={{ custom: true }}
					columns={tableColums}
					data={data}
					theme={theme}
					pagination={pagination}
				/>
			</div>
			<p className="text-xs mt-1 ms-2">Số lượng: {data.nodes.length}</p>
			<div className="flex justify-center mt-2">
				<Group position="right" mx={10}>
					<Pagination
						total={pagination.state.getTotalPages(data.nodes)}
						page={pagination.state.page + 1}
						onChange={(page) => pagination.fns.onSetPage(page - 1)}
					/>
				</Group>
			</div>
		</div>
	);
}

export default TableContainer;
