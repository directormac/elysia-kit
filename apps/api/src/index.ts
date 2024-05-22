import type { User, Session } from './types';
import { app } from './app';

app.listen(Bun.env.PORT || 3000, (server) => {
	console.log(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`);
});

type AppType = typeof app;

export type { AppType, User, Session };
