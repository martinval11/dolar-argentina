import { useEffect, useState } from 'react';
import { BrightnessHighFill, List, MoonStarsFill } from 'react-bootstrap-icons';
import styles from './Nav.module.css';

const Nav = () => {
	const [darkMode, setDarkMode] = useState(false);

	const openMenu = () => {
		document.querySelector<HTMLElement>('#dialog')!.style.display = 'flex';
	};

	const toggleLightMode = () => {
		const rootTag: any = document.querySelector('html');
		const getAttr = rootTag.getAttribute('data-theme');
		const theme: any =
			getAttr === 'dark'
				? 'light'
				: null || getAttr === 'light'
				? 'dark'
				: null;

		localStorage.setItem('theme', theme);

		setDarkMode(!darkMode);
		rootTag.setAttribute('data-theme', theme);
	};

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'light') {
			setDarkMode(false);
		}

		if (theme === 'dark') {
			setDarkMode(true);
		}
	}, []);

	return (
		<div className={styles.navContainer}>
			<img
				className={styles.navBackground}
				src='img/dollarbg.webp'
				alt='Imagen Dolares'
				title='Dólar Argentina'
			/>
			<nav className={styles.nav}>
				<li>
					<button
						id='openMenu'
						className={styles.button}
						onClick={openMenu}
						data-cy="openMenu">
						<List />
					</button>
				</li>
				<li>
					<h1>Dólar Argentina</h1>
				</li>
				<li>
					<button
						id='darkModeButton'
						onClick={toggleLightMode}
						className={styles.button}
						data-cy="darkModeButton">
						{darkMode ? <BrightnessHighFill /> : <MoonStarsFill />}
					</button>
				</li>
			</nav>
		</div>
	);
};

export default Nav;
