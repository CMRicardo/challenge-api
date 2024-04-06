import { compareSync } from "bcryptjs";
import type { Request, Response } from "express";

import { generateJWT } from "@/helpers/jwt";
import { findUserByEmail } from "@/models/user.model";

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(404).json({
				ok: false,
				message: "User with that email was not found",
			});
		}
		const validPassword = compareSync(password, user.password);
		if (!validPassword) {
			return res.status(401).json({
				ok: false,
				message: "Not valid credentials",
			});
		}
		const token = await generateJWT(user.id);
		res.json({ ok: true, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: "Internal server error",
		});
	}
};
