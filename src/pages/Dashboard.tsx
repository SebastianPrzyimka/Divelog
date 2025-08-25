import AverageDepth from '../ui/AverageDepth';
import DepthChart from '../ui/DepthChart';
import DiveChart from '../ui/DiveChart';
import TotalDives from '../ui/TotalDives';
import TotalDiveTime from '../ui/TotalDiveTime';
import styles from './Dashboard.module.css';
import CountryChart from '../ui/CountryChart';
import MapView from '../ui/Mapview';
import RecentDives from '../ui/RecentDives';

function Dashboard() {
	return (
		<div className={styles.container}>
			<div className={styles.chartContainer}>
				<DiveChart />
				<DepthChart />
			</div>
			<div className={styles.gridContainer}>
				<div className={styles.averageContainer}>
					<TotalDives />
					<TotalDiveTime />
					<AverageDepth />
				</div>
				<CountryChart />
				<MapView />
			</div>
			<div>
				<RecentDives />
			</div>
		</div>
	);
}

export default Dashboard;
