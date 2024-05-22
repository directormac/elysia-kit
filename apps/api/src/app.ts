import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import staticPlugin from '@elysiajs/static';
import cors from '@elysiajs/cors';
import { users } from './routes/user.route';
import { auth } from './routes/auth.route';
import { Logestic } from 'logestic';
import { base } from './routes';
import { chat } from './routes/chat.route';

const app = new Elysia()
	.use(Logestic.preset('common'))
	.use(
		swagger({
			path: '/docs',
			documentation: {
				info: {
					title: 'Elysia-Kit API',
					version: '0.0.1'
				}
			}
		})
	)
	.use(
		staticPlugin({
			prefix: ''
		})
	)
	.use(
		cors({
			credentials: true
		})
	)
	.get('/', ({ error }) => error('Forbidden'))
	.use(base)
	.use(users)
	.use(auth)
	.use(chat);

export { app };
