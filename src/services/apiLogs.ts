import supabase from './supabase';

export async function getLogs() {
	const { data, error } = await supabase.from('divelog').select('*');
	if (error) throw new Error('somthing went wrong ');
	console.log(data);
	return data;
}
