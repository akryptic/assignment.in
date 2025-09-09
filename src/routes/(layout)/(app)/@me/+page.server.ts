import { auth, checkAuth } from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parse } from 'cookie';

export const load = (async () => {
	checkAuth();

	return {};
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ request, cookies, locals }) => {
		try {
			const res = await auth.api.signOut({
				headers: request.headers,
				asResponse: true
			});

			const setCookieHeader = res.headers.get('set-cookie');
			if (res.status === 200) {
				if (setCookieHeader) {
					const parsedCookie = parse(setCookieHeader);
					const authCookieName = Object.keys(parsedCookie)[0];
					cookies.delete(authCookieName, {
						path: '/'
					});
					locals.session = null;
				}
			} else {
				return fail(400, { message: 'Error signing out.' });
			}
		} catch {
			return fail(400, { message: 'Error signing out.' });
		}
		redirect(303, '/auth');
	}
} satisfies Actions;
