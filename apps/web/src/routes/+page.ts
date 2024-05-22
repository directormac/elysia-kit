import { api } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const { data: todos } = await api.todos.get();
	const { data: healthcheck } = await api.healthcheck.get();

	return {
		todos,
		healthcheck
	};
};
