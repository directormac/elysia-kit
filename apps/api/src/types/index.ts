import { t } from 'elysia';
import type { User, Session } from 'lucia';

export * from './user.type';

export const queryParamsSchema = t.Object({
	q: t.Optional(
		t.String({
			default: ''
		})
	),
	page: t.Optional(
		t.Number({
			default: 0
		})
	),
	limit: t.Optional(
		t.Number({
			default: 10
		})
	)
});

export type { User, Session };
