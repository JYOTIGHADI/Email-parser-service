import express from "express";
import cors from "cors";
import errorHandler  from "./middleware/error.middleware.js";
import emailRouter from "./routes/error.routes.js";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: false,
  }),
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/emails", emailRouter);

app.use(errorHandler);

export default app;