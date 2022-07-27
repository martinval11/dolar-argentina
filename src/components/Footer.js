const Footer = (props) => {
	return (
		<>
			<footer style={{position: props.position}}>
				<small>
					Todos los datos son extraidos de la API de la página oficial de{' '}
					<a href="https://www.dolarsi.com/" target="_blank" rel="noopener noreferrer">DolarSI</a>
				</small>
			</footer>
		</>
	);
};

export default Footer;
