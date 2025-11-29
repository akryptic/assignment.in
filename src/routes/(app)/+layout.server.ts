import { checkAuth } from '$lib/server/auth';
import { superValidate } from 'sveltekit-superforms';
import type { LayoutServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateProfileSchema } from '$lib/form-schemas/profile-schema';

export const load = (async () => {
	const { user } = checkAuth();
	let isProfileComplete = true;

	if (!user.dob || !user.gender || !user.phone) {
		isProfileComplete = false;
	}

	return {
		form: await superValidate(zod(updateProfileSchema)),
		user,
		isProfileComplete
	};
}) satisfies LayoutServerLoad;
