import { useMemo } from 'react';
import styles from './AverageDepth.module.css';
import { useDiveLogs } from '../hooks/useData';

function AverageDepth() {
	const { logs } = useDiveLogs();

	const maxDepth = useMemo(() => {
		if (!logs || logs.length === 0) return null;
		return Math.max(...logs.map(log => log.maxDepth));
	}, [logs]);

	return (
		<div className={styles.container}>
			<span>{maxDepth !== null ? `${maxDepth} m` : '0'}</span>
			<span>Max Depth</span>
		</div>
	);
}

export default AverageDepth;
