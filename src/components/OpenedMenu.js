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
						<a href='#' onClick={() => closeDialog()}>
							<i className='bi bi-x-lg'></i>
						</a>
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
					<br />
					<br />
					<a
						href='https://github.com/martinval11/'
						target='_blank'
						rel='noopener noreferrer'
						onClick={() => closeDialog()}>
						GitHub
					</a>
				</article>
			</dialog>
		</>
	);
};

export default OpenedMenu;
