import styles from './DecoratedHeading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DecoratedHeading({ content }) {
	return (
		<div className="text-center">
			<h2
				className={cx(
					'decorated-heading',
					'relative inline-block uppercase px-10 text-2xl'
				)}
			>
				{content}
			</h2>
		</div>
	);
}

export default DecoratedHeading;
