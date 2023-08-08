import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<small>
				Todos los datos son extraidos de la API oficial de{' '}
				<a
					href='https://www.dolarsi.com/'
					target='_blank'
					rel='noopener noreferrer nofollow'
					className={styles.link}
					title='DolarSI'>
					DolarSI
				</a>
			</small>
		</footer>
	);
};

export default Footer;
