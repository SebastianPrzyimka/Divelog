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

import { useEffect, useState } from 'react';
import { getLogs } from '../services/apiLogs';
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
			<ResponsiveContainer width='100%' height='100%'>
				<AreaChart
					width={500}
					height={300}
					data={chartData}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='date' tick={{ fontSize: 12 }} />
					<YAxis
						label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
						domain={[0, 'dataMax + 5']}
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
											borderRadius: '4px',
											boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
										}}
									>
										<p>
											<strong>Dive #{data.diveNumber}</strong>
										</p>
										<p>Date: {label}</p>
										<p>Max Depth: {data.depth}m</p>
										<p>Location: {data.location}</p>
										<p>Site: {data.site}</p>
									</div>
								);
							}
							return null;
						}}
					/>
					<Area
						type='monotone'
						dataKey='depth'
						stroke='#2f6cad'
						fill='#58a6ff'
						fillOpacity={0.6}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default DepthChart;
