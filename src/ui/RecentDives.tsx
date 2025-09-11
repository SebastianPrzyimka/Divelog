import styles from './RecentDives.module.css';
import { useDiveLogs } from '../hooks/useData';
import { formatDate } from '../utils/formatDate';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import { getDiveDuration } from '../utils/calculateTime';
import { Link } from 'react-router';
import Spinner from './Spinner';
import { useDelete } from '../hooks/useDelete';

function RecentDives() {
	const { logs, loading } = useDiveLogs();
	const { mutate: deleteDive } = useDelete();

	function handleDelete(id: string | number) {
		deleteDive(id);
	}

	if (loading) return <Spinner />;
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
								<span
									className={styles.trash}
									onClick={() => handleDelete(log.id)}
								>
									<HiOutlineTrash />
								</span>
								<Link to={`/divelog/${log.id}`} className={styles.preview}>
									<HiOutlineEye />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default RecentDives;
