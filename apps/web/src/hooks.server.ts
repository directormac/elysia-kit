import type { AppType } from '$lib';
import type { Handle } from '@sveltejs/kit';
import { treaty } from '@elysiajs/eden';
import { PUBLIC_API_URL } from '$env/static/public';
import { sequence } from '@sveltejs/kit/hooks';

const injectApiHandle: Handle = async ({ event, resolve }) => {
	const api = treaty<AppType>(PUBLIC_API_URL, {
		fetcher: event.fetch
	});
	event.locals.api = api;

	return resolve(event);
};

const injectSessionHandle: Handle = async ({ event, resolve }) => {
	// const { user, session } = await event.locals.api.userContext.get();

	return resolve(event);
};

export const handle = sequence(injectApiHandle);
