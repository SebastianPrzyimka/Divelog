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
	// Group dives by month and count them
	const divesByMonth = diveData.reduce(
		(acc: Record<string, number>, dive: DiveLog) => {
			const date = new Date(dive.date);
			const monthYear = date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
			});

			acc[monthYear] = (acc[monthYear] || 0) + 1;
			return acc;
		},
		{}
	);

	// Convert to array format for chart and sort chronologically
	return Object.entries(divesByMonth)
		.map(([month, count]) => ({
			month,
			dives: count,
			date: new Date(month + ' 1'), // For proper sorting
		}))
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
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='month' className={styles.fontSize} />
					<YAxis
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
