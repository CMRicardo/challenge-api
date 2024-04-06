import { hashSync, genSaltSync } from "bcryptjs";

import { db } from "@/db/connection";

import type { SafeUser } from "@/interfaces/safe-user.interface";
import type { User } from "@/interfaces/user.interface";
import type { Row } from "@libsql/client";

const fromRowsToSafeUser = (rows: Row[]): SafeUser[] => {
	return rows as unknown as SafeUser[];
};

const fromRowsToUser = (rows: Row[]): User[] => {
	return rows as unknown as User[];
};

export const saveUser = async (data: User) => {
	try {
		const password = hashSync(data.password, genSaltSync());

		const { lastInsertRowid: id } = await db.execute({
			sql: "INSERT INTO users (name, email, password, active) VALUES (?, ?, ?, ?)",
			args: [data.name, data.email, password, data.active ?? true],
		});

		const result = await fetchUser(Number(id));
		if (!result) return null;

		const user: SafeUser = {
			id: Number(id),
			name: result.name,
			email: result.email,
			active: result.active,
		};
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const fetchUsers = async (
	quantity = 5,
): Promise<SafeUser[] | undefined> => {
	try {
		const { rows } = await db.execute({
			sql: "SELECT id, name, email FROM users WHERE active = true LIMIT ?;",
			args: [quantity],
		});
		const users: SafeUser[] = fromRowsToSafeUser(rows);
		return users;
	} catch (error) {
		return undefined;
	}
};

export const fetchUser = async (id: number): Promise<SafeUser | undefined> => {
	try {
		const { rows } = await db.execute({
			sql: "SELECT id, name, email, active FROM users WHERE id = ?",
			args: [id],
		});
		const [user] = fromRowsToSafeUser(rows);
		return user;
	} catch (error) {
		console.error(error);
		return undefined;
	}
};

export const modifyUser = async (
	id: number,
	data: { name?: string; email?: string },
) => {
	const originalUser = await fetchUser(id);

	if (!originalUser) return null;

	const updatedUser: SafeUser = {
		...originalUser,
		...data,
	};

	try {
		await db.execute({
			sql: "UPDATE users SET name = ?, email = ?, active = ? WHERE id = ?",
			args: [
				updatedUser.name ?? originalUser.name,
				updatedUser.email ?? originalUser.email,
				id,
			],
		});

		return updatedUser;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const changeUserStatus = async (
	id: number,
	status: boolean,
): Promise<SafeUser | null> => {
	const user = await fetchUser(id);
	if (!user) return null;
	try {
		await db.execute({
			sql: "UPDATE users SET active = ? WHERE id = ?",
			args: [status, id],
		});
		return { ...user, active: status };
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
	try {
		const { rows } = await db.execute({
			sql: "SELECT id, name, email, active, password FROM users WHERE email = ?",
			args: [email],
		});
		const [user] = fromRowsToUser(rows);
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};
