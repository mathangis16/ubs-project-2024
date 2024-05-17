import express from "express";
//to connect to mongodb database
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
config();
const app = express();
app.use(express.json()); //middleware
app.use(morgan("dev")); //remove in production
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map