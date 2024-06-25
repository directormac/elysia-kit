import Elysia from 'elysia';
// Disable can't build if this is used
// import Stream from '@elysiajs/stream';
// import { format } from 'date-fns';

export const base = new Elysia().get('/healthcheck', () => 'OK');
// .get(
// 	'/time',
// 	() =>
// 		new Stream(async (stream) => {
// 			while (true) {
// 				stream.send(format(new Date(), 'MMMM do yyyy HH:mm:ss'));
// 				await stream.wait(1000);
// 			}
// 		})
// );
