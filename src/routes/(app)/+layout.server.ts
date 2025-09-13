import { checkAuth } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const { user } = checkAuth();

	return {
		user
	};
}) satisfies LayoutServerLoad;
