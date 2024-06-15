<script lang="ts">
	import { currentTime, createTodosStore, toastsStore } from '$lib/stores';

	let { data } = $props();

	let { healthcheck, todos } = data;

	let current = currentTime();

	let todosStore = createTodosStore(todos);

	let toasts = toastsStore();

	const handleSubmit = async (
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const name = String(form.get('name') ?? 'default');

		const ok = await todosStore.addTodo({
			name,
			status: false
		});

		if (ok) {
			event.currentTarget.reset();
		}
	};
</script>

<main class="grid justify-items-center gap-y-4">
	<h1>Welcome to SvelteKit</h1>
	<!-- <Hero /> -->

	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>

	{#if healthcheck}
		{healthcheck}
		{current.time}
	{/if}
	<div>
		<form onsubmit={handleSubmit} class="grid w-1/2 justify-items-center gap-4">
			<input type="text" name="name" placeholder="Enter name" />
			<input type="submit" value="Add Todo" class="bg-white text-black" />
		</form>
	</div>

	{#if todosStore.todos}
		{#each todosStore.todos as { name, status }}
			<p>{name} - {status}</p>
		{/each}
	{/if}

	{#if toasts.toasts}
		{#each toasts.toasts as { message, type }}
			<p>{type} - {message}</p>
		{/each}
	{/if}
</main>
