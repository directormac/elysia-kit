import Elysia, { t } from 'elysia';
import { errorMiddlware, userContext } from '../middleware';
import { authFormSchema, userFormSchema, password } from '../types';
import { createUser } from '../services/mutations/user.mutation';
import { auth as authService, createSessionCookie } from '../services/auth';
import {
	queryAuthCredentials,
	queryUserEmails,
	queryUserUsernames
} from '../services/queries';

export const passcheck = t.Object({
	password
});

export const auth = new Elysia({ prefix: 'auth/' }).guard((app) =>
	app
		.model({
			singup: t.Omit(userFormSchema, ['id', 'createdAt', 'role', 'updatedAt']),
			login: authFormSchema
		})
		.use(userContext)
		.use(errorMiddlware)
		.post(
			'login',
			async ({ body, error, cookie }) => {
				const [user] = await queryAuthCredentials.execute({
					username: body.key,
					email: body.key
				});
				const invalidResponse = {
					message: 'Invalid Credentials',
					errors: {
						key: ['Invalid Credentials'],
						password: ['Invalid Credentials']
					}
				};

				if (!user) throw error('Unprocessable Content', invalidResponse);

				const validPassword = await Bun.password.verify(
					body.password,
					user.password
				);

				if (!validPassword)
					throw error('Unprocessable Content', invalidResponse);

				const sessionCookie = await createSessionCookie(user.id);

				cookie[authService.sessionCookieName].set({
					value: sessionCookie.value,
					...sessionCookie.attributes
				});

				return {
					session: sessionCookie.value
				};
			},
			{
				body: 'login'
			}
		)
		.post(
			'signup',
			async ({ body, error }) => {
				const [userUsername] = await queryUserUsernames.execute({
					username: body.username
				});

				if (userUsername) {
					throw error('Unprocessable Content', {
						errors: {
							username: 'Username already exists'
						}
					});
				}

				const [userEmail] = await queryUserEmails.execute({
					email: body.email
				});

				if (userEmail) {
					throw error('Unprocessable Content', {
						errors: {
							email: 'Email already exists'
						}
					});
				}

				const user = await createUser(body);

				if (user) {
					return {
						message: 'Signed up successfully'
					};
				}

				throw error('Internal Server Error', {
					message: 'An error occurred while creating the user'
				});
			},
			{
				body: 'singup'
			}
		)
		.post('logout', () => 'Unimplemented')
);
