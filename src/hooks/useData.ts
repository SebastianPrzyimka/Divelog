import { useEffect, useState } from 'react';
import { getLogs } from '../services/apiLogs';

// Type definitions
export type DiveLog = {
	id: string;
	diveNumber: number;
	date: string;
	location: string;
	site: string;
	timeIn: string;
	timeOut: string;
	maxDepth: number;
	visibility: number;
	waterTemp: number;
	currents: string;
	waves: string;
	suit: string;
	tank: string;
	weight: number;
	comments: string;
};

type useDiveLogsReturn = {
	logs: DiveLog[];
	loading: boolean;
	error: string | null;
};

export function useDiveLogs(): useDiveLogsReturn {
	const [logs, setLogs] = useState<DiveLog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	async function fetchLogs() {
		try {
			setLoading(true);
			setError('');
			const data = await getLogs();
			setLogs(data);
		} catch (err) {
			setError(String(err) || 'Failed to load dive logs');
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchLogs();
	}, []);

	return { logs, loading, error };
}
