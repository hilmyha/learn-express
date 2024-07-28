import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import UserRoute from './routes/user.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(UserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});