import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';

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
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to='dashboard' />} />
						<Route path='dashboard' element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
