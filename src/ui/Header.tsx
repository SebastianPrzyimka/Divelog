import HeaderMenu from './HeaderMenu';
import styles from '../ui/Header.module.css';
function Header() {
	return (
		<header className={styles.wrapper}>
			<HeaderMenu />
		</header>
	);
}

export default Header;
