// import { Elysia, t, type Static } from 'elysia';
// import { EventEmitter } from 'events';
// // import Stream from '@elysiajs/stream';
//
// const todo = t.Object({
// 	id: t.Optional(t.Number()),
// 	name: t.String({
// 		minLength: 1,
// 		error: 'Name is required'
// 	}),
// 	status: t.Boolean()
// });
//
// type Todo = Static<typeof todo>;
//
// type Toast = {
// 	message: string;
// 	type: 'success' | 'error' | 'info' | 'warning';
// 	data?: Record<string, any>;
// };
//
// class ToastsService extends EventEmitter {
// 	private static instance: ToastsService;
//
// 	constructor() {
// 		super();
// 		this.setMaxListeners(0);
// 	}
// 	public static getInstance() {
// 		if (!ToastsService.instance) {
// 			ToastsService.instance = new ToastsService();
// 		}
// 		return ToastsService.instance;
// 	}
//
// 	public newTodoError(message: string) {
// 		this.emit('todos:error', { message, type: 'error' } satisfies Toast);
// 	}
//
// 	public newTodo(name: string) {
// 		this.emit('todos:new', { message: name, type: 'success' } satisfies Toast);
// 	}
//
// 	public updateTodo(id: number) {
// 		this.emit('todos:update', {
// 			message: `Todo ${id} updated`,
// 			type: 'success',
// 			data: {
// 				id
// 			}
// 		} satisfies Toast);
// 	}
// }
//
// const toastsService = ToastsService.getInstance();
//
// const todosStore: Todo[] = [
// 	{
// 		id: 1,
// 		name: 'Todo 1',
// 		status: true
// 	},
// 	{
// 		id: 2,
// 		name: 'Todo 2',
// 		status: false
// 	}
// ];
//
// export const todos = new Elysia({ prefix: 'todos' })
// 	.model({
// 		todo
// 	})
// 	.get('', () => todosStore)
// 	.get(
// 		':id',
// 		({ params, error }) => {
// 			const todo = todosStore.find((todo) => todo.id === params.id);
// 			if (todo) return todo;
// 			return error('Not Found', 'Todo not found');
// 		},
// 		{
// 			params: t.Object({
// 				id: t.Number()
// 			})
// 		}
// 	)
// 	.patch(':id', () => '')
// 	.post(
// 		'',
// 		async ({ body }) => {
// 			const length = todosStore.length;
//
// 			todosStore.push({
// 				id: length + 1,
// 				...body
// 			});
//
// 			toastsService.newTodo(body.name);
// 			return {
// 				ok: true
// 			};
// 		},
// 		{
// 			body: 'todo',
// 			error({ code, error }) {
// 				switch (code) {
// 					case 'VALIDATION':
// 						toastsService.newTodoError(error.message);
// 						return error.message;
// 				}
// 			}
// 		}
// 	);
//
// // export const toasts = new Elysia({ prefix: 'toasts' }).get(
// // 	'/todos',
// // 	() =>
// // 		new Stream(async (stream) => {
// // 			toastsService.on('todos:new', (toast) => {
// // 				return stream.send(JSON.stringify(toast));
// // 			});
// // 			toastsService.on('todos:update', (toast) => {
// // 				return stream.send(JSON.stringify(toast));
// // 			});
// // 			toastsService.on('todos:error', (toast) => {
// // 				return stream.send(JSON.stringify(toast));
// // 			});
// // 		})
// // );
