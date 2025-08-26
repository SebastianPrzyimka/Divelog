import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

import styles from '../ui/CountryChart.module.css';
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

	return [...counts.entries()]
		.map(([location, dives]) => ({ location, dives }))
		.sort((a, b) => b.dives - a.dives);
};

const CountryChart = () => {
	const { logs } = useDiveLogs();
	const chartData = toLocationCounts(logs);

	return (
		<div className={styles.gridChart}>
			<ResponsiveContainer width='100%' height={220}>
				<BarChart
					data={chartData}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='location' className={styles.fontSize} />
					<YAxis
						allowDecimals={false}
						label={{ value: 'Country', angle: -90, position: 'insideLeft' }}
					/>
					<Tooltip
						content={({ active, payload, label }) => {
							if (active && payload && payload.length) {
								return (
									<div className={styles.tooltip}>
										<p className={styles.tooltipCountry}>{label}</p>
										<p className={styles.tooltipDives}>
											Dives: {payload[0].value}
										</p>
									</div>
								);
							}
							return null;
						}}
					/>

					<Bar dataKey='dives' name='Dives' fill='#58a6ff' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CountryChart;
