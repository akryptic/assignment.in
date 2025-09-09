import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	if (params.orderNumber.length < 7) {
        console.log(params.orderNumber);
        
		return new Response(JSON.stringify({ message: 'Invalid Order Number' }), { status: 400 });
	}

	return json({ orderNumber: params.orderNumber });
};
