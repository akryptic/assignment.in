import { fail, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { orderTrackerFormSchema } from '$lib/form-schemas/track-order-schema';
import type { Actions } from '@sveltejs/kit';

export const load = (async () => {
	return {
		form: await superValidate(zod(orderTrackerFormSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(orderTrackerFormSchema));

		if (!form.valid) {
			return fail(400, { message: 'An error occurred' });
		}

		// const { orderNumber } = form.data;

		try {
			// TODO: get order from database by order number
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong' });
		}
	}
} satisfies Actions;
