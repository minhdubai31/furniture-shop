import { useEffect, useState } from 'react';
import SidePanel from './Panel';
import { MantineProvider } from '@mantine/core';

function Admin() {
	const [activeTab, setActiveTab] = useState();

	return (
		<div className="bg-gray-100 min-h-[100vh] p-4">
			<div className="h-svh w-44 fixed left-0 top-0">
				<SidePanel setActiveTab={setActiveTab} />
			</div>
			<div className="ms-44">
				<MantineProvider>{activeTab}</MantineProvider>
			</div>
		</div>
	);
}

export default Admin;
