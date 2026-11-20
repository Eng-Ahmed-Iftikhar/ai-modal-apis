import { UnauthorizedError } from "../errors/auth.error";
import asyncHandler from "../middlewares/aysnc-handler";

export const registerUser = asyncHandler((req, res) => {
    throw new UnauthorizedError("register");
    res.json({ messge: "register" });
});
