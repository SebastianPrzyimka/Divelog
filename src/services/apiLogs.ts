import type { DiveLog } from '../hooks/useData';
import supabase from './supabase';

export async function getLogs() {
	const { data, error } = await supabase.from('divelog').select('*');
	if (error) throw new Error('somthing went wrong ');
	console.log(data);
	return data;
}

export async function submitEditLogs(
	newLog: Partial<DiveLog>,
	id?: string | number
) {
	if (!id) {
		const { data, error } = await supabase
			.from('divelog')
			.insert([newLog])
			.select()
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	if (id) {
		const { data, error } = await supabase
			.from('divelog')
			.update(newLog)
			.eq('id', id)
			.select()
			.single();

		if (error) {
			console.error(error); // ✅ Fix typo here
			throw new Error('Cabins could not be loaded');
		}

		return data;
	}
}

export async function getLogById(id: string | number) {
	const { data, error } = await supabase
		.from('divelog')
		.select('*')
		.eq('id', id)
		.single();

	if (error) throw new Error(error.message);
	return data;
}
