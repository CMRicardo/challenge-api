import express, { json } from "express";

import { userRoute } from "./routes/user.route";
import { authRoute } from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
	res.json({
		ok: true,
		message: "Hello World!",
	});
});

app.get("/api", (req, res) => {
	res.json({
		ok: true,
		routes: ["/auth", "/users"],
	});
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
