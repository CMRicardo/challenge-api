import type { SafeUser } from "./safe-user.interface";

export interface User extends Omit<SafeUser, "active"> {
	password: string;
	active?: boolean;
}
