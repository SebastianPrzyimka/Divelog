import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

import styles from '../ui/CountryChart.module.css';
import { getLogs } from '../services/apiLogs';
import { useDiveLogs, type DiveLog } from '../hooks/useData';

type LocationData = {
	location: string;
	dives: number;
};

const toLocationCounts = (diveData: DiveLog[]): LocationData[] => {
	const counts = new Map<string, number>();
	for (const d of diveData) {
		const key = d.location || 'Unknown';
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}
	// Optional: sort by most dives
	return [...counts.entries()]
		.map(([location, dives]) => ({ location, dives }))
		.sort((a, b) => b.dives - a.dives);
};

const CountryChart = () => {
	const { logs } = useDiveLogs(); // or useDiveLogs() if you prefer the hook
	const chartData = toLocationCounts(logs);

	return (
		<div className={styles.gridChart}>
			{/* Use a fixed height unless the parent has an explicit height */}
			<ResponsiveContainer width='100%' height={250}>
				<BarChart
					data={chartData}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: -15,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='location' />
					<YAxis
						allowDecimals={false}
						label={{ value: 'Country', angle: -90, position: 'insideLeft' }}
					/>
					<Tooltip />
					<Legend />
					<Bar dataKey='dives' name='Dives' fill='#58a6ff' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CountryChart;
