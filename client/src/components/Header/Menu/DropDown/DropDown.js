import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/shift-away.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function DropDown({ label, link, children }) {
	return (
		<Tippy
			className="!text-base"
			placement="bottom-start"
			maxWidth="none"
			offset={[-10, 10]}
			animation="shift-away"
			arrow={false}
			theme="light"
			interactive={true}
			interactiveDebounce={20}
			content={
				<div className="grid grid-flow-col grid-rows-6 auto-cols-max gap-y-4 gap-x-16 my-4 mx-6">
					{children.map((child, index) => (
						<Link
							key={index}
							to={child.link}
							className="text-gray-500 hover:text-black duration-300"
						>
							{child.text}
						</Link>
					))}
				</div>
			}
		>
			<Link to={link} className="hover:text-[#ffc83a] duration-200">
				{label} <FontAwesomeIcon className='ps-1 pb-0.5 text-[0.5rem]' icon={faChevronDown} />
			</Link>
		</Tippy>
	);
}

export default DropDown;
