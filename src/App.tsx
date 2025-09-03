import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import LogDive from './pages/Logdive';
import { Toaster } from 'react-hot-toast';
import DivelogData from './features/divelog/DivelogData';
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0,
		},
	},
});

// isLoading is now called isPending

// The cacheTime option is now called gcTime

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							<Route index element={<Navigate replace to='dashboard' />} />
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='Logdive' element={<LogDive />} />
							<Route path='/divelog/:id' element={<DivelogData />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
			<Toaster
				position='top-center'
				toastOptions={{
					// applies to ALL toasts
					style: {
						fontSize: '2rem', // bigger text
						padding: '16px 20px', // more space
						minWidth: '360px', // wider card
						borderRadius: '12px',
					},
				}}
			/>
		</>
	);
}

export default App;
