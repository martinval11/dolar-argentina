const Footer = ({ position }) => {
	return (
		<>
			<footer style={{position: position}}>
				<small>
					Todos los datos son extraidos de la API oficial de{' '}
					<a href='https://www.dolarsi.com/' target='_blank' rel='noopener noreferrer nofollow' title='DolarSI'>DolarSI</a>
				</small>
			</footer>
		</>
	);
};

export default Footer;
