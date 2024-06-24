import { createInsertSchema } from 'drizzle-typebox';
import { t, type Static } from 'elysia';
import { user } from '../schemas';

export const password = t.String({
	minLength: 8,
	maxLength: 64,
	pattern: '^(?=.*\\d)(?=.*[!@#$%^&*\\-~_?])(?=.*[A-Z])(?=.*[a-z]).*$',
	errorMessage: {
		minLength: 'must be at least 8 characters long',
		maxLength: 'cannot exceed 64 characters',
		pattern: {
			value:
				'Password must include at least one number, one special character, one uppercase letter, and one lowercase letter'
		}
	}
});

export const userFormSchema = createInsertSchema(user, {
	email: t.String({
		format: 'email',
		error: 'Invalid email'
	}),
	password
});

export const authFormSchema = t.Object({
	key: t.Union([
		t.String({
			format: 'email',
			error: 'Invalid email',
			default: ''
		}),
		t.String({ error: 'Username / Email is Required' })
	]),
	password: t.String({
		error: 'Password is Required'
	})
});

export type UserFormSchema = Static<typeof userFormSchema>;
export type AuthFormSchema = Static<typeof authFormSchema>;
