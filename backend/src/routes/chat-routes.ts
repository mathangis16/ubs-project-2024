import {Router} from "express";
import {verifyToken} from "../utils/token-manager.js";

const chatRoutes=Router();  //protected API
chatRoutes.post("/new", verifyToken);

export default chatRoutes;