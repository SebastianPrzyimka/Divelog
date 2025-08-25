import { useState, useEffect } from 'react';

import Logo from '../public/Logo.png';
import styles from './HeaderMenu.module.css';

import Nav from './Nav';

function HeaderMenu() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	const closeMenu = () => setOpen(false);

	return (
		<header className={styles.header}>
			<div className={styles.brand}>
				<img className={styles.logo} src={Logo} alt='Logo' />
				<span className={styles.memo}>Divememo</span>
			</div>

			<Nav open={open} setOpen={setOpen} closeMenu={closeMenu} />
		</header>
	);
}

export default HeaderMenu;
