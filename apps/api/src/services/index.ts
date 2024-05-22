import { t } from 'elysia';
import { TypeCompiler } from '@sinclair/typebox/compiler';

const envSchema = t.Object({
	NODE_ENV: t.String()
});

const C = TypeCompiler.Compile(envSchema);

const R = C.Check({
	NODE_ENV: 'production'
});
