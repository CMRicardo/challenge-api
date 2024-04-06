import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const validateJWT = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({
			ok: false,
			message: "No x-token header in request",
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.JWT_SECRET);
		req.uid = uid;
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			message: "Invalid token",
		});
	}
};
