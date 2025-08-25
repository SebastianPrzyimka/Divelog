import styles from './RecentDives.module.css';
import { useDiveLogs } from '../hooks/useData';
import { formatDate } from '../utils/formatDate';
import { HiOutlineEye } from 'react-icons/hi';
import { getDiveDuration } from '../utils/calculateTime';

function RecentDives() {
	const { logs } = useDiveLogs();
	return (
		<div className={styles.container}>
			<h2>Recent Dives</h2>
			<div>
				<div className={styles.containerTable}>
					<div>Date</div>
					<div>Country</div>
					<div>Depth</div>
					<div>Duration</div>
					<div>Preview</div>
				</div>
				<div className={styles.containerLog}>
					{logs.map(log => (
						<div key={log.id} className={styles.diveTable}>
							<div>{formatDate(log.date)}</div>
							<div>{log.location}</div>
							<div>{log.maxDepth} m</div>
							<div>{getDiveDuration(log.timeIn, log.timeOut)} min</div>
							<div className={styles.icon}>
								<HiOutlineEye />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default RecentDives;
