import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import styles from './DiveChart.module.css';
import type { DiveLog } from '../hooks/useData';
import { useDiveLogs } from '../hooks/useData';
type ChartData = {
	month: string;
	dives: number;
};

type DiveChartProps = {
	diveData?: DiveLog[];
};

// Transform your dive log data into chart format
const transformDiveData = (diveData: DiveLog[]): ChartData[] => {
	// Group dives by year+month
	const divesByMonth = diveData.reduce(
		(acc: Record<string, number>, dive: DiveLog) => {
			const date = new Date(dive.date);

			// Get full year and month name (or number)
			const year = date.getFullYear();
			const month = date.toLocaleString('en-US', { month: 'short' });

			// Use YYYY-MM format for sorting keys
			const key = `${year}-${date.getMonth() + 1}`; // e.g., 2025-8

			acc[key] = (acc[key] || 0) + 1;
			return acc;
		},
		{}
	);

	// Convert to array and sort chronologically
	return Object.entries(divesByMonth)
		.map(([key, count]) => {
			const [year, monthNum] = key.split('-').map(Number);
			const date = new Date(year, monthNum - 1, 1);
			return {
				month: `${date.toLocaleString('en-US', { month: 'short' })} ${year}`, // "Aug 2025"
				dives: count,
				date,
			};
		})
		.sort((a, b) => a.date.getTime() - b.date.getTime())
		.map(({ month, dives }) => ({ month, dives }));
};
const DiveChart: React.FC<DiveChartProps> = () => {
	const { logs } = useDiveLogs();
	const chartData = transformDiveData(logs);

	return (
		<div className={styles.container}>
			<span className={styles.title}>Dives over time</span>
			<ResponsiveContainer width='100%' height='100%'>
				<LineChart
					width={500}
					height={200}
					data={chartData}
					margin={{
						top: 10,
						right: 30,
						left: 5,
						bottom: -1,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='month' className={styles.fontSize} />
					<YAxis
						tick={false} // Hide tick labels
						axisLine={false} // Hide axis line
						tickLine={false} // Hide tick marks
						width={20} // Minimal width
						type='number'
						domain={[0, 'dataMax']}
						allowDecimals={false}
						tickCount={6}
						label={{ value: 'Dives (Nr)', angle: -90, position: 'insideLeft' }}
					/>
					<Tooltip
						formatter={(value: number) => [
							<span className={styles.tooltip}>Dives: {value}</span>,
						]}
						labelFormatter={(label: string) => (
							<span className={styles.tooltip}>Month: {label}</span>
						)}
					/>
					<Line
						type='monotone'
						dataKey='dives'
						stroke='#2f6cad'
						activeDot={{ r: 8 }}
						name='Dives'
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default DiveChart;
