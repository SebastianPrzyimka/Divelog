import { NavLink } from 'react-router';
import styles from './Nav.module.css';
import { type Dispatch, type SetStateAction } from 'react';
const navItems = [
	{ to: '/dashboard', label: 'Dashboard' },
	{ to: '/Logdive', label: 'Logdive' },
	{ to: '/Album', label: 'Album' },
	{ to: '/Todo', label: 'List to do' },
	{ to: '/Planner', label: 'Plan Ai' },
];

type Navprops = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	closeMenu: () => void;
};

function Nav({ open, setOpen, closeMenu }: Navprops) {
	return (
		<>
			<nav className={styles.navDesktop} aria-label='Main'>
				{navItems.map(({ to, label }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							isActive ? styles.active : styles.link
						}
					>
						{label}
					</NavLink>
				))}
			</nav>

			{/* Burger button */}
			<button
				className={styles.burger}
				aria-label='Open menu'
				aria-expanded={open}
				aria-controls='mobile-menu'
				onClick={() => setOpen(v => !v)}
			>
				<span
					aria-hidden='true'
					className={open ? styles.burgerBarOpen : styles.burgerBar}
				/>
			</button>

			{/* Mobile nav */}
			<div
				id='mobile-menu'
				className={`${styles.mobileOverlay} ${open ? styles.mobileOpen : ''}`}
				onClick={closeMenu}
			>
				<nav className={styles.navMobile} aria-label='Moible'>
					{navItems.map(({ to, label }) => (
						<NavLink
							key={to}
							to={to}
							onClick={closeMenu}
							className={({ isActive }) =>
								isActive ? styles.activeMobile : styles.linkMobile
							}
						>
							{label}
						</NavLink>
					))}
				</nav>
			</div>
		</>
	);
}

export default Nav;
