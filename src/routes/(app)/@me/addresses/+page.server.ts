import { checkAuth } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	checkAuth();
	return {};
}) satisfies PageServerLoad;
