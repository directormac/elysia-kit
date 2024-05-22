import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { alias } from 'drizzle-orm/pg-core';
import {
	sql,
	eq,
	asc,
	ne,
	and,
	like,
	notLike,
	notInArray,
	or,
	not,
	desc,
	isNull,
	notExists
} from 'drizzle-orm';

import * as schema from '../../schemas';

const client = postgres(Bun.env.DATABASE_URL!, {
	max: 10
});

const db = drizzle(client, {
	schema
});

export { client, db };

export {
	alias,
	sql,
	eq,
	asc,
	ne,
	and,
	like,
	notLike,
	notInArray,
	or,
	not,
	desc,
	isNull,
	notExists
};
