import jwt from "jsonwebtoken";

export const generateJWT = (id: number): Promise<string | undefined> => {
	return new Promise((resolve, reject) => {
		const payload = { id };
		jwt.sign(
			payload,
			process.env.JWT_SECRET ?? "",
			{
				expiresIn: "12h",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject(new Error("We could not generate a token"));
				}
				resolve(token);
			},
		);
	});
};
