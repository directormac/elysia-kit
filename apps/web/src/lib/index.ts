// place files you want to import through the `$lib` alias in this folder.
import { treaty } from '@elysiajs/eden';
import type { AppType, User, Session } from 'shared';
import { PUBLIC_API_URL } from '$env/static/public';

const api = treaty<AppType>(PUBLIC_API_URL);

type ClientType = typeof api;

type GetClientOptions = {
	fetch?: typeof globalThis.fetch;
	path?: string;
};

/**
 * @description getClient is a wrapper around hc that sets the base URL to http://localhost:5173 and the fetch function to globalThis.fetch.
 * @link https://hono.dev/guides/rpc
 * @param fetch - custom fetch function like fetch
 * For sveltekit use the {fetch} from load function
 */
const getClient = ({ fetch = globalThis.fetch }: GetClientOptions = {}) => {
	return treaty<AppType>(PUBLIC_API_URL, { fetcher: fetch });
};

export { api, getClient };
export type { AppType, ClientType, Session, User };
