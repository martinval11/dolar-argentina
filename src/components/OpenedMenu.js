import { Link } from 'react-router-dom';

const OpenedMenu = () => {
	const closeDialogDisplay = () => {
		document.querySelector('.dialog').style.display = 'none';
	};

	const closeDialog = () => {
		document.querySelector('.dialog').style.display = 'flex';
	};

	return (
		<>
			<dialog className='dialog' open onClick={() => closeDialogDisplay()}>
				<article onClick={() => closeDialog()}>
					<header id='dialogHeader'>
						<button id='closeBtn' onClick={() => closeDialog()}>
							<i className='bi bi-x-lg'></i>
						</button>
						<span id="title">Menu</span>
					</header>
					<Link to='/' onClick={() => closeDialog()}>
						Inicio
					</Link>
					<br />
					<br />
					<Link to='/conversor' onClick={() => closeDialog()}>
						Conversor de Divisas
					</Link>
				</article>
			</dialog>
		</>
	);
};

export default OpenedMenu;
