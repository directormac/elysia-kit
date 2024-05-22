import Elysia from 'elysia';

export const chat = new Elysia({ prefix: 'chat' }).ws('/ws', {
	message(ws, message) {
		ws.send(message);
	}
});
