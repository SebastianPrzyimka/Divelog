import styles from './DivelogData.module.css';

import { useQuery } from '@tanstack/react-query';
import { getLogById } from '../../services/apiLogs';
import { getDiveDuration } from '../../utils/calculateTime';
import { formatDate } from '../../utils/formatDate';
import { useParams } from 'react-router';

function DivelogData() {
	const { id } = useParams<{ id: string }>();
	const {
		data: log,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['divelog', id],
		queryFn: () => getLogById(id!),
		enabled: !!id,
	});

	if (isLoading) return <p>Loading…</p>;
	if (isError) return <p>Error: {(error as Error).message}</p>;

	const duration =
		log?.timeIn && log?.timeOut
			? `${getDiveDuration(log.timeIn, log.timeOut)} min`
			: '—';

	return (
		<section className={styles.page}>
			<article className={styles.card}>
				<header className={styles.header}>
					<div className={styles.headerLeft}>
						<h1 className={styles.title}>Dive #{log?.diveNumber ?? log?.id}</h1>
						<p className={styles.subTitle}>
							<span className={styles.date}>{formatDate(log?.date ?? '')}</span>
							<span className={styles.dot} aria-hidden>
								•
							</span>
							<span className={styles.location}>{log?.location || '—'}</span>
						</p>
					</div>

					<div className={styles.pills}>
						<span className={styles.pill}>
							<strong>In:</strong> {log?.timeIn || '—'}
						</span>
						<span className={styles.pill}>
							<strong>Out:</strong> {log?.timeOut || '—'}
						</span>
						<span className={styles.pill}>
							<strong>Duration:</strong> {duration}
						</span>
						<span className={styles.pill}>
							<strong>Site:</strong> {log?.site || '—'}
						</span>
					</div>
				</header>

				<div className={styles.statsRow}>
					<div className={styles.stat}>
						<span className={styles.statLabel}>Max Depth</span>
						<span className={styles.statValue}>
							{log?.maxDepth ?? '—'}
							<span className={styles.suffix}>m</span>
						</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statLabel}>Visibility</span>
						<span className={styles.statValue}>
							{log?.visibility ?? '—'}
							<span className={styles.suffix}>m</span>
						</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statLabel}>Water Temp</span>
						<span className={styles.statValue}>
							{log?.waterTemp ?? '—'}
							<span className={styles.suffix}>°C</span>
						</span>
					</div>
				</div>

				<section className={styles.metaGrid}>
					<div className={styles.metaCard}>
						<span className={styles.metaLabel}>Suit</span>
						<span className={styles.metaValue}>{log?.suit || '—'}</span>
					</div>
					<div className={styles.metaCard}>
						<span className={styles.metaLabel}>Tank</span>
						<span className={styles.metaValue}>{log?.tank || '—'}</span>
					</div>
					<div className={styles.metaCard}>
						<span className={styles.metaLabel}>Weight</span>
						<span className={styles.metaValue}>{log?.weight ?? '—'} kg</span>
					</div>
					<div className={styles.metaCard}>
						<span className={styles.metaLabel}>Currents</span>
						<span className={styles.metaValue}>{log?.currents || '—'}</span>
					</div>
					<div className={styles.metaCard}>
						<span className={styles.metaLabel}>Waves</span>
						<span className={styles.metaValue}>{log?.waves || '—'}</span>
					</div>
					<div className={styles.metaCard}>
						<span className={styles.metaLabel}>Site</span>
						<span className={styles.metaValue}>{log?.site || '—'}</span>
					</div>
				</section>

				{log?.comments && (
					<section className={styles.notes}>
						<h2>Notes</h2>
						<p>{log.comments}</p>
					</section>
				)}
			</article>
		</section>
	);
}

export default DivelogData;
