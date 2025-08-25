export const getDiveDuration = (timeIn: string, timeOut: string): number => {
	const [inHour, inMin] = timeIn.split(':').map(Number);
	const [outHour, outMin] = timeOut.split(':').map(Number);

	const inMinutes = inHour * 60 + inMin;
	const outMinutes = outHour * 60 + outMin;

	return outMinutes - inMinutes;
};
