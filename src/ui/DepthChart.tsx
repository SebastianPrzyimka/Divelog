import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import styles from './DepthChart.module.css';
import { useDiveLogs } from '../hooks/useData';
import type { DiveLog } from '../hooks/useData';

// Type definitions
type ChartData = {
	diveNumber: number;
	depth: number;
	date: string;
	location: string;
	site: string;
};

const transformDepthData = (diveData: DiveLog[]): ChartData[] => {
	return diveData
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.map(dive => ({
			diveNumber: dive.diveNumber,
			depth: dive.maxDepth,
			date: new Date(dive.date).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
			}),
			location: dive.location,
			site: dive.site,
		}));
};

function DepthChart() {
	const { logs } = useDiveLogs();
	const chartData = transformDepthData(logs);

	return (
		<div className={styles.container}>
			<span className={styles.title}>Depth over time</span>
			<ResponsiveContainer width={'100%'} height={'100%'} debounce={200}>
				<AreaChart
					width={500}
					height={100}
					data={chartData}
					margin={{
						top: 10,
						right: 5,
						left: 0,
						bottom: 0,
					}}
				>
					{/* --- SVG clipPath reveal (draws left→right in 1.5s) --- */}
					<defs>
						<clipPath id='depthClip' clipPathUnits='objectBoundingBox'>
							<rect x='0' y='0' width='0' height='1'>
								<animate
									attributeName='width'
									from='0'
									to='1'
									dur='1.5s'
									begin='0s'
									fill='freeze'
								/>
							</rect>
						</clipPath>
					</defs>

					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='date' className={styles.fontSize} />
					<YAxis
						allowDecimals={false}
						tick={false}
						axisLine={false}
						tickLine={false}
						width={20}
						label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
						type='number'
						domain={[0, 'dataMax']}
						tickCount={6}
					/>
					<Tooltip
						formatter={value => [`${value}m`, 'Max Depth']}
						labelFormatter={(label, payload) => {
							if (payload && payload[0]) {
								const data = payload[0].payload;
								return `Dive #${data.diveNumber} - ${label}`;
							}
							return label;
						}}
						content={({ active, payload, label }) => {
							if (active && payload && payload.length) {
								const data = payload[0].payload;
								return (
									<div
										style={{
											backgroundColor: 'white',
											padding: '10px',
											border: '1px solid #ccc',
										}}
									>
										<p>
											<strong>Dive #{data.diveNumber}</strong>
										</p>
										<p>Date: {label}</p>
										<p>Max Depth: {data.depth}m</p>
										<p>Country: {data.location}</p>
									</div>
								);
							}
							return null;
						}}
					/>

					{/* Area revealed via clipPath; Recharts animation disabled to avoid jump */}
					<g clipPath='url(#depthClip)'>
						<Area
							type='monotone'
							dataKey='depth'
							stroke='#2f6cad'
							fill='#58a6ff'
							fillOpacity={0.6}
							isAnimationActive={false}
							// isUpdateAnimationActive={false}
						/>
					</g>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default DepthChart;

// import {
// 	AreaChart,
// 	Area,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	ResponsiveContainer,
// } from 'recharts';
// import styles from './DepthChart.module.css';
// import { useDiveLogs } from '../hooks/useData';
// import type { DiveLog } from '../hooks/useData';

// // Type definitions
// type ChartData = {
// 	diveNumber: number;
// 	depth: number;
// 	date: string;
// 	location: string;
// 	site: string;
// };

// const transformDepthData = (diveData: DiveLog[]): ChartData[] => {
// 	return diveData
// 		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
// 		.map(dive => ({
// 			diveNumber: dive.diveNumber,
// 			depth: dive.maxDepth,
// 			date: new Date(dive.date).toLocaleDateString('en-US', {
// 				month: 'short',
// 				day: 'numeric',
// 			}),
// 			location: dive.location,
// 			site: dive.site,
// 		}));
// };

// function DepthChart() {
// 	const { logs } = useDiveLogs();
// 	const chartData = transformDepthData(logs);

// 	return (
// 		<div className={styles.container}>
// 			<span className={styles.title}>Depth over time</span>
// 			<ResponsiveContainer width={'100%'} height={'100%'} debounce={200}>
// 				<AreaChart
// 					width={500}
// 					height={100}
// 					data={chartData}
// 					margin={{
// 						top: 10,
// 						right: 5,
// 						left: 0,
// 						bottom: 0,
// 					}}
// 				>
// 					<CartesianGrid strokeDasharray='3 3' />
// 					<XAxis dataKey='date' className={styles.fontSize} />
// 					<YAxis
// 						allowDecimals={false}
// 						tick={false}
// 						axisLine={false}
// 						tickLine={false}
// 						width={20}
// 						label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
// 						type='number'
// 						domain={[0, 'dataMax']}
// 						tickCount={6}
// 					/>
// 					<Tooltip
// 						formatter={value => [`${value}m`, 'Max Depth']}
// 						labelFormatter={(label, payload) => {
// 							if (payload && payload[0]) {
// 								const data = payload[0].payload;
// 								return `Dive #${data.diveNumber} - ${label}`;
// 							}
// 							return label;
// 						}}
// 						content={({ active, payload, label }) => {
// 							if (active && payload && payload.length) {
// 								const data = payload[0].payload;
// 								return (
// 									<div
// 										style={{
// 											backgroundColor: 'white',
// 											padding: '10px',
// 											border: '1px solid #ccc',
// 										}}
// 									>
// 										<p>
// 											<strong>Dive #{data.diveNumber}</strong>
// 										</p>
// 										<p>Date: {label}</p>
// 										<p>Max Depth: {data.depth}m</p>
// 										<p>Country: {data.location}</p>
// 									</div>
// 								);
// 							}
// 							return null;
// 						}}
// 					/>
// 					<Area
// 						type='monotone'
// 						dataKey='depth'
// 						stroke='#2f6cad'
// 						fill='#58a6ff'
// 						fillOpacity={0.6}
// 						isAnimationActive={true}
// 					/>
// 				</AreaChart>
// 			</ResponsiveContainer>
// 		</div>
// 	);
// }

// export default DepthChart;
