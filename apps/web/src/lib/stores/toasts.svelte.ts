import { PUBLIC_API_URL } from '$env/static/public';
import { api } from '$lib';

type Toast = {
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	data?: Record<string, any>;
};

export const toastsStore = () => {
	let toasts: Toast[] = $state<Toast[]>([]);

	$effect(() => {
		const eventSource = new EventSource(PUBLIC_API_URL + '/toasts/todos');
		eventSource.onmessage = (event) => {
			console.log(event.data);
			toasts.push(JSON.parse(event.data));
		};

		return () => {
			eventSource.close();
		};
	});

	return {
		get toasts() {
			return toasts;
		}
	};
};
