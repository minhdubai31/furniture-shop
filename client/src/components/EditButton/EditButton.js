import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function EditButton({ showModalFn, item, setEditingFn }) {
	return (
		<button
			onClick={() => {
				showModalFn(true);
				setEditingFn(item);
			}}
			className="text-white bg-green-500 hover:bg-green-600 duration-150 rounded w-7 h-7 flex items-center justify-center"
		>
			<FontAwesomeIcon icon={faEdit} />
		</button>
	);
}

export default EditButton;
