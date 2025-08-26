import { useDiveLogs } from '../hooks/useData';
import styles from './TotalDiveTime.module.css';
function TotalDiveTime() {
	const { logs } = useDiveLogs();
	const totalDiveTime = logs.reduce((sum, log) => sum + log.maxDepth, 0);
	const hours = Math.floor(totalDiveTime / 60);
	const minutes = totalDiveTime % 60;
	return (
		<div className={styles.container}>
			<span>
				{hours}h {minutes}min
			</span>
			<span>Dive Time</span>
		</div>
	);
}

export default TotalDiveTime;
