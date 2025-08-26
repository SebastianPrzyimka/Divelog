import type { DiveLog } from '../hooks/useData';
import styles from './Logs.module.css';
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
