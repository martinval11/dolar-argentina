import { Link } from 'react-router-dom';

const OpenedMenu = () => {
	const closeDialog = () => {
		document.querySelector('.dialog').style.display = 'none';
	};

	return (
		<>
			<dialog className='dialog' open onClick={() => closeDialog()}>
				<article onClick={() => closeDialog()}>
					<header id='dialogHeader'>
						<button id='closeBtn' onClick={() => closeDialog()}>
							<i className='bi bi-x-lg'></i>
						</button>
						<span id='title'>Menu</span>
					</header>
					<Link to='/' onClick={() => closeDialog()} rel='follow' title='Inicio'>
						Inicio
					</Link>
					<br />
					<br />
					<Link to='/conversor' onClick={() => closeDialog()} rel='follow' title='Conversor de Divisas'>
						Conversor de Divisas
					</Link>
					<br />
					<br />
					<Link to='/euro' onClick={() => closeDialog()} rel='follow' title='Cotizaciones en Euro'>
						Cotizaciones en Euro
					</Link>
				</article>
			</dialog>
		</>
	);
};

export default OpenedMenu;
