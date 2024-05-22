import { PUBLIC_API_URL } from '$env/static/public';
import { format } from 'date-fns';
import { Date } from 'svelte/reactivity';

const currentTime = () => {
	const getFormattedDate = () => format(new Date(), 'MMMM do yyyy HH:mm:ss');

	let time: string = $state(getFormattedDate());

	$effect(() => {
		const serverTime = new EventSource(PUBLIC_API_URL + '/time');

		serverTime.onmessage = (event) => {
			time = event.data;
		};

		return () => {
			serverTime.close();
		};
	});

	return {
		get time() {
			return time;
		}
	};
};

export { currentTime };
