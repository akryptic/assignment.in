import { auth, checkAuth } from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parse } from 'cookie';
import { superValidate } from 'sveltekit-superforms';
import { profileSchema, updateProfileSchema } from '$lib/form-schemas/profile-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async () => {
	const { user } = checkAuth();

	return {
		form: await superValidate(
			{
				name: user.name,
				dob: (user.dob ? user.dob : new Date()).toISOString().split('T')[0],
				phone: user.phone,
				gender: user.gender as 'male' | 'female'
			},
			zod(profileSchema)
		)
	};
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
	},

	completeProfile: async ({ request }) => {
		const { user } = checkAuth();
		const form = await superValidate(request, zod(updateProfileSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { dob, gender, phone } = form.data;

		await db
			.update(users)
			.set({
				gender,
				dob: new Date(dob),
				phone
			})
			.where(eq(users.id, user.id));

		return { form };
	}
} satisfies Actions;
