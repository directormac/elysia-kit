import Elysia from 'elysia';

export const chat = new Elysia({ prefix: 'chat' }).ws('/ws', {
	message(ws, message) {
		ws.subscribe('public:chat');
		ws.send(message);
		chat.server?.publish('public:chat', message as string);
	}
});
