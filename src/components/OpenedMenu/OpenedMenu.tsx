import { XLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styles from './OpenedMenu.module.css';

const OpenedMenu = () => {
	const closeDialog = () => {
		document.querySelector<HTMLElement>('#dialog')!.style.display = 'none';
	};

	return (
		<dialog
			id='dialog'
			className={styles.dialog}
			open
			onClick={closeDialog}>
			<article onClick={(event) => event.stopPropagation()}>
				<header className={styles.dialogHeader}>
					<span id='title'>Menu</span>
					<button onClick={closeDialog}>
						<XLg />
					</button>
				</header>
				<Link
					to='/'
					onClick={closeDialog}
					rel='follow'
					data-cy="homeLink">
					Inicio
				</Link>
				<Link
					to='/conversor'
					onClick={closeDialog}
					rel='follow'
					data-cy="conversorLink">
					Conversor de Divisas
				</Link>
				<Link
					to='/euro'
					onClick={closeDialog}
					rel='follow'
					data-cy="euroLink">
					Cotizaciones en Euro
				</Link>
			</article>
		</dialog>
	);
};

export default OpenedMenu;
