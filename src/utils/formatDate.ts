export function formatDate(date: string | Date): string {
	const d = typeof date === 'string' ? new Date(date) : date;

	if (isNaN(d.getTime())) return '';

	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short', // full month name
		year: 'numeric',
	}).format(d);
}
