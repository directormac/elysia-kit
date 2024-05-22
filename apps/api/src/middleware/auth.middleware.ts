import Elysia from 'elysia';
import { userContext } from './user-context.middleware';

export const authMiddleWare = new Elysia()
	// This injects the current user and sets it in the responses that consume authMiddleWare
	.use(userContext)
	.onBeforeHandle({ as: 'scoped' }, ({ user, error }) => {
		if (!user) throw error('Unauthorized', 'Unauthorized');
	});
