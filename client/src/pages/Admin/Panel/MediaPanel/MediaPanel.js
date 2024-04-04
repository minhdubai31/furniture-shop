import { useEffect } from 'react';
import Gallery from '../../../../components/Gallery';

function MediaPanel() {
	useEffect(() => {
		document.title = 'Quản lý hình ảnh';
	});

	return <Gallery />;
}

export default MediaPanel;
