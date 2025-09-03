import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './DiveLogForm.module.css';
import Button from '../../ui/Button';
import { submitEditLogs } from '../../services/apiLogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
	image?: FileList;
};

export default function DiveLogForm() {
	const { register, handleSubmit, reset } = useForm<DiveLog>();
	const [preview, setPreview] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: Partial<DiveLog>) => {
			return submitEditLogs(data);
		},
		onSuccess: () => {
			toast.success('Dive Saved');
			queryClient.invalidateQueries({ queryKey: ['divelog'] });
			reset();
			setPreview(null);
		},
		onError: () => {
			toast.error('Somthing went wrong');
		},
	});

	const onSubmit = (data: DiveLog) => {
		// Clean up the data - remove undefined/empty values AND the id field
		const submitData: Partial<DiveLog> = {};

		// Only include fields that have values, but EXCLUDE 'id' for new records
		Object.entries(data).forEach(([key, value]) => {
			if (
				value !== undefined &&
				value !== '' &&
				key !== 'image' &&
				key !== 'id'
			) {
				// Tell TS "this is safe"
				(submitData as any)[key] = value;
			}
		});

		// Check if we have at least some data to submit
		if (Object.keys(submitData).length === 0) {
			return;
		}

		mutation.mutate(submitData);
	};

	const onReset = () => {
		console.log('🔄 Form reset');
		reset();
		setPreview(null);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		} else {
			setPreview(null);
		}
	};

	return (
		<div className={styles.page}>
			<form
				className={styles.card}
				onSubmit={handleSubmit(onSubmit)}
				onReset={onReset}
			>
				<header className={styles.header}>
					<h1>Dive Log Entry</h1>
					<span aria-hidden>🐠</span>
				</header>

				<fieldset className={styles.section}>
					<legend>Dive Info</legend>
					<div className={styles.grid}>
						<label className={styles.field}>
							<span>Dive Number</span>
							<input
								type='number'
								min={1}
								placeholder='e.g., 42'
								{...register('diveNumber', {
									valueAsNumber: true,
									required: 'Dive number is required',
								})}
							/>
						</label>
						<label className={styles.field}>
							<span>Date</span>
							<input
								type='date'
								{...register('date', {
									required: 'Date is required',
								})}
							/>
						</label>
						<label className={styles.field}>
							<span>Location</span>
							<input
								type='text'
								placeholder='Country / Region'
								{...register('location', {
									required: 'Location is required',
								})}
							/>
						</label>
						<label className={styles.field}>
							<span>Site</span>
							<input
								type='text'
								placeholder='Dive site name'
								{...register('site')}
							/>
						</label>
					</div>
				</fieldset>

				{/* Timing */}
				<fieldset className={styles.section}>
					<legend>Timing</legend>
					<div className={styles.grid}>
						<label className={styles.field}>
							<span>Time In</span>
							<input type='time' {...register('timeIn')} />
						</label>
						<label className={styles.field}>
							<span>Time Out</span>
							<input type='time' {...register('timeOut')} />
						</label>
					</div>
				</fieldset>

				{/* Conditions */}
				<fieldset className={styles.section}>
					<legend>Conditions</legend>
					<div className={styles.grid}>
						<label className={styles.field}>
							<span>Max Depth (m)</span>
							<input
								type='number'
								min={0}
								step={0.5}
								placeholder='0'
								{...register('maxDepth', { valueAsNumber: true })}
							/>
						</label>
						<label className={styles.field}>
							<span>Visibility (m)</span>
							<input
								type='number'
								min={0}
								step={1}
								placeholder='0'
								{...register('visibility', { valueAsNumber: true })}
							/>
						</label>
						<label className={styles.field}>
							<span>Water Temp (°C)</span>
							<input
								type='number'
								step={0.5}
								placeholder='0'
								{...register('waterTemp', { valueAsNumber: true })}
							/>
						</label>
						<label className={styles.field}>
							<span>Currents</span>
							<select {...register('currents')}>
								<option value=''>Select…</option>
								<option>None</option>
								<option>Mild</option>
								<option>Moderate</option>
								<option>Strong</option>
							</select>
						</label>
						<label className={styles.field}>
							<span>Waves</span>
							<select {...register('waves')}>
								<option value=''>Select…</option>
								<option>Calm</option>
								<option>Moderate</option>
								<option>Rough</option>
							</select>
						</label>
					</div>
				</fieldset>

				{/* Equipment */}
				<fieldset className={styles.section}>
					<legend>Equipment</legend>
					<div className={styles.grid}>
						<label className={styles.field}>
							<span>Suit</span>
							<select {...register('suit')}>
								<option value=''>Select…</option>
								<option>Shorty</option>
								<option>Wetsuit</option>
								<option>Drysuit</option>
								<option>Skinsuit</option>
							</select>
						</label>
						<label className={styles.field}>
							<span>Tank</span>
							<select {...register('tank')}>
								<option value=''>Select…</option>
								<option>Air</option>
								<option>Nitrox</option>
								<option>Trimix</option>
								<option>Other</option>
							</select>
						</label>
						<label className={styles.field}>
							<span>Weight (kg)</span>
							<input
								type='number'
								min={0}
								step={0.5}
								placeholder='0'
								{...register('weight', { valueAsNumber: true })}
							/>
						</label>
					</div>
				</fieldset>

				{/* Image */}
				<fieldset className={styles.section}>
					<legend>Dive Image</legend>
					<label className={styles.field}>
						<span>Upload Image</span>
						<input
							type='file'
							accept='image/*'
							{...register('image')}
							onChange={handleImageChange}
						/>
					</label>
					{preview && (
						<img src={preview} alt='Dive preview' className={styles.preview} />
					)}
					<small className={styles.hint}>
						Add a photo of the site, buddies, or marine life (optional).
					</small>
				</fieldset>

				{/* Notes */}
				<fieldset className={styles.section}>
					<legend>Comments</legend>
					<label className={styles.field}>
						<span className={styles.srOnly}>Comments</span>
						<textarea
							rows={5}
							placeholder='Observations, buddies, marine life, etc.'
							{...register('comments')}
						/>
					</label>
				</fieldset>

				{/* Remove the hidden id field since we're creating new entries */}

				<div className={styles.actions}>
					<Button type='reset' variant='delete'>
						Exit
					</Button>
					<Button type='submit' variant='submit' disabled={mutation.isPending}>
						{mutation.isPending ? 'Saving...' : 'Save Dive'}
					</Button>
				</div>
			</form>
		</div>
	);
}
