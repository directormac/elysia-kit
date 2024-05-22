import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { session, user, type UserInsertSchema } from '../schemas';
import { Cookie, Lucia } from 'lucia';

const mode = Bun.env.NODE_ENV;

const secure = !(mode === 'development' || mode === 'test');

console.log('mode:', mode);
console.log('secure:', secure);

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure
		}
	},
	getUserAttributes: (attrs) => ({
		id: attrs.id,
		username: attrs.username,
		name: attrs.name,
		role: attrs.role,
		email: attrs.email,
		createdAt: attrs.createdAt
	})
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: UserInsertSchema;
	}
}

export const createSessionCookie = async (userId: string): Promise<Cookie> => {
	const session = await auth.createSession(userId, {});

	return auth.createSessionCookie(session.id);
};
