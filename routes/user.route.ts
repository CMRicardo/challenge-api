import { Router } from "express";

import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "@/controllers/user.controller";

import { validateJWT } from "@/middlewares/validate-jwt";

export const userRoute = Router();

userRoute.get("/", [validateJWT, getUsers]);
userRoute.get("/:id", [validateJWT, getUser]);
userRoute.post("/", [validateJWT, createUser]);
userRoute.patch("/:id", [validateJWT, updateUser]);
userRoute.delete("/:id", [validateJWT, deleteUser]);
