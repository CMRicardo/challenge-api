import { z } from "zod";

const userSchema = z.object({
	name: z
		.string({
			required_error: "Name is required",
			invalid_type_error: "Name must be a string",
		})
		.min(2),
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email(),
	password: z
		.string({
			required_error: "Password is required",
			invalid_type_error: "Password must be a string",
		})
		.min(6),
	active: z.boolean().optional(),
});

export const validateUser = (data: unknown) => {
	return userSchema.safeParse(data);
};

export const validatePartialUser = (data: unknown) => {
	return userSchema.partial().safeParse(data);
};
