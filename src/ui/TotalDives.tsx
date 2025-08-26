import { useDiveLogs } from '../hooks/useData';
import styles from './TotalDives.module.css';
function TotalDives() {
	const { logs } = useDiveLogs();
	const totalDives = Object.keys(logs).length;
	return (
		<div className={styles.container}>
			<span>{totalDives}</span>
			<span>Total Dives</span>
		</div>
	);
}

export default TotalDives;
