import { useEffect } from 'react';
import Banner from '../../components/Banner';
import DecoratedHeading from '../../components/DecoratedHeading';


function Home() {
	useEffect(() => {
		const getUser = async function (id) {
			try {
				const response = await fetch('http://localhost:8080/users/'+id);
				const data = await response.json();
				console.log(data);
			}
			catch (error) {
            console.log(error);
         }
		}

		getUser(1);
	}, [])

	return (
		<div>
			<Banner imgSrc="https://www.decorpot.com/images/interior-designers-in-pune.jpg" />
         <DecoratedHeading content="Danh sách sản phẩm" />
		</div>
	);
}

export default Home;
