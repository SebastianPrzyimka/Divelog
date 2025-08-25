import { useDiveLogs } from '../hooks/useData';
import styles from './TotalDives.module.css';
function TotalDives() {
	const { logs } = useDiveLogs();

	return (
		<div className={styles.container}>
			<span>{Object.keys(logs).length}</span>
			<span>Total Dives</span>
		</div>
	);
}

export default TotalDives;
