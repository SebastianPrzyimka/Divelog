// MapView.tsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapView.module.css';

import L from 'leaflet';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker1x from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// --- Fix #1: make default marker icon URLs work with modern bundlers ---
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore - remove Leaflet's URL resolver so our explicit URLs are used
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
	// Next/Webpack file-loader objects expose `.src`; Vite returns a string.
	iconRetinaUrl: (marker2x as any).src ?? (marker2x as unknown as string),
	iconUrl: (marker1x as any).src ?? (marker1x as unknown as string),
	shadowUrl: (markerShadow as any).src ?? (markerShadow as unknown as string),
});
/* eslint-enable @typescript-eslint/ban-ts-comment */

type Coords = [number, number];

function Recenter({ center }: { center: Coords }) {
	const map = useMap();
	useEffect(() => {
		map.setView(center);
	}, [center, map]);
	return null;
}

export default function MapView() {
	const [pos, setPos] = useState<Coords | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Request location immediately on mount (triggers the browser prompt)
	useEffect(() => {
		if (!window.isSecureContext) {
			setError('Geolocation requires HTTPS (or http://localhost in dev).');
			return;
		}
		if (!('geolocation' in navigator)) {
			setError('Geolocation not supported in this browser.');
			return;
		}
		navigator.geolocation.getCurrentPosition(
			p => {
				setPos([p.coords.latitude, p.coords.longitude]);
			},
			err => {
				setError(
					err.code === err.PERMISSION_DENIED
						? 'Permission denied. Check the site’s Location permission.'
						: err.code === err.POSITION_UNAVAILABLE
						? 'Position unavailable.'
						: err.code === err.TIMEOUT
						? 'Location request timed out.'
						: 'Failed to get location.'
				);
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
		);
	}, []);

	// Global bounds (avoid the poles singularity)
	const bounds: [[number, number], [number, number]] = [
		[-85, -180],
		[85, 180],
	];

	return (
		<div className={styles.map}>
			<MapContainer
				center={pos ?? [51.505, -0.09]} // fallback until permission resolves
				zoom={5}
				scrollWheelZoom={true}
				className={styles.map}
				bounceAtZoomLimits={false}
				maxBounds={bounds}
				maxBoundsViscosity={2.0}
			>
				<TileLayer
					url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
					attribution='Tiles © Esri'
					minZoom={3}
					maxZoom={10}
					noWrap={true}
				/>

				{pos && (
					<>
						<Marker position={pos}>
							<Popup>You are here 📍</Popup>
						</Marker>
						<Recenter center={pos} />
					</>
				)}
			</MapContainer>

			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
}
