import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// import routes
import AuthRoute from "./routes/auth.route";
import UserRoute from "./routes/user.route";

dotenv.config();

const app = express();
app.use(cors(
  {
    origin: "*", // allow to server to accept request from different origin
  }
));
app.use(express.json());

// routes
app.use("/api", AuthRoute);
app.use("/api", UserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
