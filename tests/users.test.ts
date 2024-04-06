import { describe, it, expect } from "bun:test";

import { fetchUser, fetchUsers } from "../models/user.model";

describe("users", () => {
	it("should fetch users", async () => {
		const users = await fetchUsers();
		expect(users).toEqual([
			{
				id: 1,
				name: "John Doe",
				email: "john@mail.com",
			},
			{
				id: 2,
				name: "Jane Doe",
				email: "jane@mail.com",
			},
		]);
	});
	it("should fetch user", async () => {
		const user = await fetchUser(1);
		expect(user).toEqual({
			id: 1,
			name: "John Doe",
			email: "john@mail.com",
		});
	});
	it("should not fetch user", async () => {
		const user = await fetchUser(-1);
		expect(user).toBeUndefined();
	});
});
