import type { DiveLog } from '../hooks/useData';

type LogsProps = { logs: DiveLog[] };

function Logs({ logs }: LogsProps) {
	return (
		<>
			{logs.map(log => (
				<li>{log.location}</li>
			))}
		</>
	);
}

export default Logs;
