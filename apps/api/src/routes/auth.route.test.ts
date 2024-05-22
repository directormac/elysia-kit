function parseErrors(errors) {
	const parsedErrors = errors.reduce((acc, error) => {
		const { path, message } = error;
		if (!acc[path]) {
			acc[path] = [];
		}
		acc[path].push(message);
		return acc;
	}, {});

	return { errors: parsedErrors };
}

// Example error array
const errorArray = [
	{
		type: 52,
		schema: {
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
			},
			type: 'string'
		},
		path: '/password',
		value: 'qwe1',
		message: 'Expected string length greater or equal to 8'
	},
	{
		type: 53,
		schema: {
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
			},
			type: 'string'
		},
		path: '/password',
		value: 'qwe1',
		message:
			"Expected string to match '^(?=.*\\d)(?=.*[!@#$%^&*\\-~_?])(?=.*[A-Z])(?=.*[a-z]).*$'"
	}
];

// Parse the errors
// const parsedErrors = parseErrors(errorArray);
