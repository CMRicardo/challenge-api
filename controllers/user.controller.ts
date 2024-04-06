import type { Request, Response } from "express";

import {
	changeUserStatus,
	fetchUser,
	fetchUsers,
	modifyUser,
	saveUser,
} from "../models/user.model";
import { validatePartialUser, validateUser } from "@/schemas/user.schema";
import type { User } from "@/interfaces/user.interface";

export const getUsers = async (req: Request, res: Response) => {
	const { quantity = 5 } = req.query;
	const users = await fetchUsers(Number(quantity));

	return res.json({
		ok: true,
		users,
	});
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await fetchUser(Number(id));

	if (!user) {
		return res.status(404).json({
			ok: false,
			message: "User not found",
		});
	}

	return res.json({
		ok: true,
		user,
	});
};

export const createUser = async (req: Request, res: Response) => {
	const result = validateUser(req.body);

	if (!result.success)
		return res.status(400).json({
			ok: false,
			message: JSON.parse(result.error.message),
		});

	const newUser = await saveUser(result.data as User);
	if (!newUser) {
		return res.status(500).json({
			ok: false,
			message: "Error creating user",
		});
	}

	return res.json({
		ok: true,
		user: newUser,
	});
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const originalUser = await fetchUser(Number(id));
	if (!originalUser)
		return res.status(404).json({
			ok: false,
			message: "User not found",
		});

	const result = validatePartialUser(req.body);

	if (!result.success)
		return res.status(400).json({
			ok: false,
			message: JSON.parse(result.error.message),
		});

	const updatedUser = await modifyUser(Number(id), result.data);
	return res.json({ ok: true, user: updatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await changeUserStatus(Number(id), false);
	if (!result)
		return res.status(404).json({
			ok: false,
			message: "User not found",
		});

	return res.json({ ok: true, message: "User deleted" });
};
