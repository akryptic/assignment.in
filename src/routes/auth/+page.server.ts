import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { emptySchema } from '$lib/form-schemas/empty-schema';
import { auth } from '$lib/server/auth';

export const load = (async ({ locals }) => {
	if (locals.session || locals.user) {
		redirect(307, '/@me');
	}

	return {
		form: await superValidate(zod(emptySchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(emptySchema));

		if (!form.valid) {
			return message(form, 'An error occurred', { status: 500 });
		}

		let gUrl;
		try {
			const res = await auth.api.signInSocial({
				body: {
					provider: 'google',
					callbackURL: '/@me'
				}
			});

			gUrl = res.url;
		} catch (error) {
			console.log(error);
			return message(form, 'An error occurred', { status: 500 });
		}

		if (!gUrl) {
			return fail(500, {
				message: 'Something failed!'
			});
		}

		redirect(303, gUrl.toString());
	}
} satisfies Actions;
