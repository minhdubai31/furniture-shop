import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookSquare,
	faInstagram,
	faLinkedin,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Warranties from './Warranties';

function Footer() {
	return (
		<div>
			{/* Warranties */}
			<Warranties />

			{/* Information */}
			<div className="text-center bg-[#333] text-gray-200 pt-12">
				<h2 className="uppercase text-xl mb-4">Liên hệ chúng tôi</h2>
				<div className="flex gap-8 justify-center text-2xl">
					<FontAwesomeIcon icon={faFacebookSquare} />
					<FontAwesomeIcon icon={faInstagram} />
					<FontAwesomeIcon icon={faTwitter} />
					<FontAwesomeIcon icon={faLinkedin} />
				</div>

				{/* Copyright */}
				<div className="text-xs border-t border-white/15 py-2 mt-10 font-sans text-white/50">
					<p>&copy; 2024 - Bản quyền của Trà Hoàng Minh</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
