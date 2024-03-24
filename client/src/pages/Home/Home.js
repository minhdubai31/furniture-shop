import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Banner from '../../components/Banner';
import OutStandingCategories from './OutStandingCategories';

function Home() {
	useEffect(() => {
		document.title = 'Trang chủ';
	}, []);
	return (
		<div>
			<Header />
			<Banner imgSrc="https://www.thekarighars.com/wp-content/uploads/2022/10/Slider-2-Living-Dining.jpg" />
			<OutStandingCategories />
			<Footer />
		</div>
	);
}

export default Home;
