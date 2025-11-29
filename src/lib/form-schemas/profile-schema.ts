import { z } from 'zod';

export const profileSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters long')
		.max(100, 'Name must be at most 100 characters long'),
	dob: z.string().date(),
	phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Phone number must be in valid E.164 format'),
	gender: z.enum(['male', 'female'])
});

export const updateProfileSchema = z.object({
	dob: z.string().date(),
	phone: z.string().regex(/\d{10}$/, 'Phone number must be 10 digits'),
	gender: z.enum(['male', 'female'], {
		required_error: 'Please select a gender'
	})
});
