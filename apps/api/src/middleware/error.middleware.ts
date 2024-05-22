import Elysia from 'elysia';

export const errorMiddlware = new Elysia().onError(
	{ as: 'global' },
	({ code, error }) => {
		switch (code) {
			case 'VALIDATION':
				const values = error.value as Record<string, string>;
				const err = error.validator.Errors(error.value).First();

				console.log(err);

				console.log(error.all.map(({ message }) => message + '\n'));

				return {
					form: {
						...values,
						password: ''
					},
					errors: error.all
				};
		}
	}
);
