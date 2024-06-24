import Elysia, { t } from 'elysia';

export const errorMiddlware = new Elysia().onError(
	{ as: 'global' },
	({ code, error }) => {
		switch (code) {
			case 'VALIDATION':
				const values = error.value as Record<string, string>;
				// const err = error.validator.Errors(error.value).First();
				//
				// console.log(error.all);

				const formattedErrors = {
					field: error.all.reduce(
						(acc, error) => {
							const fieldPath = error.path.slice(1);
							const errorMessages = [];

							// Extract messages from the "anyOf" schema options
							if (error.schema?.anyOf) {
								for (const option of error.schema.anyOf) {
									if (option.error) {
										errorMessages.push(option.error);
									}
								}
							}

							if (!errorMessages.includes(error.message)) {
								errorMessages.push(error.message);
							}

							acc[fieldPath] = errorMessages;
							return acc;
						},
						{} as Record<string, string[]>
					)
				};

				console.log(formattedErrors);

				return {
					field: {
						...values,
						password: ''
					},
					errors: formattedErrors
				};
		}
	}
);
