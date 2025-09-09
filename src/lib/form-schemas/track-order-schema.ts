import { z } from 'zod';

export const orderTrackerFormSchema = z.object({
	orderNumber: z.string().nonempty('Order number cannot be empty!')
});
