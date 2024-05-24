import { Router } from "express";
import { getAllUsers, userSignup, userLogin } from "../controllers/user-controllers.js";
import { signupValidator, validate, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, userLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map