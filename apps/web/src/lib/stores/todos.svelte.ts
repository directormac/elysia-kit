import { api } from '$lib';

type Todo = {
	id?: number;
	name: string;
	status: boolean;
};

type Todos = Todo[];

const postTodo = async (todo: Todo) => {
	const { data, error } = await api.todos.post({
		...todo
	});
	if (data) return data.ok;

	if (error) return error.value;
	return false;
};

export const createTodosStore = (initValue: Todos | null = null) => {
	let todos = $state<Todos>(initValue ?? []);

	const syncTodos = async () => {
		const { data } = await api.todos.get();
		if (data) todos = data;
	};

	const addTodo = async (todo: Todo) => {
		const ok = await postTodo(todo);

		if (ok) {
			todos.push(todo);
			await syncTodos();
		}

		return ok;
	};

	return {
		get todos() {
			return todos;
		},
		addTodo,
		syncTodos
	};
};
