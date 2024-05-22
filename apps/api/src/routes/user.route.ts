import Elysia, { t } from 'elysia';
import { db, eq } from '../services/db';
import { user } from '../schemas';
import { authMiddleWare, errorMiddlware } from '../middleware';
import { queryParamsSchema } from '../types';
import { queryUsers } from '../services/queries';

const idParams = t.Object({
	id: t.String()
});

export const users = new Elysia({ prefix: 'users' }).guard((app) =>
	app
		.use(authMiddleWare)
		.use(errorMiddlware)
		.model({
			queryParams: queryParamsSchema
		})
		.get(
			'',
			async ({ query }) => await queryUsers(query.page, query.limit, query.q),
			{
				query: 'queryParams'
			}
		)
		.get(
			':id',
			async ({ params }) =>
				await db.select().from(user).where(eq(user.id, params.id)),
			{
				params: idParams
			}
		)
		.post('', () => 'OK')
		.put(':id', () => 'OK', {
			params: idParams
		})
		.delete(':id', () => 'OK', {
			params: idParams
		})
);
