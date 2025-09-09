import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL,
	basePath: '/api/auth',
	database: drizzleAdapter(db, {
		provider: 'pg',
		usePlural: true
	}),
	socialProviders: {
		google: {
			enabled: true,
			prompt: 'select_account',
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET
		}
	},
	user: {
		additionalFields: {
			isAdmin: {
				type: 'boolean',
				required: true
			},
			image: {
				type: 'string'
			},
			isManager: {
				type: 'boolean',
				required: true
			}
		}
	},
	advanced: {
		database: {
			generateId: false
		}
	}
});

export type Session = typeof auth.$Infer.Session;

export const checkAuth = () => {
	const { locals } = getRequestEvent();

	if (!locals.user || !locals.session) {
		redirect(303, '/auth');
	}

	return {
		user: locals.user,
		session: locals.user
	};
};
