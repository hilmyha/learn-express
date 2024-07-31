import dotenv from "dotenv";
import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import RefreshToken from "../models/refreshtoken.model";

dotenv.config();

const secretKey = process.env.JWT_SECRET;
// const refreshSecretKey = process.env.REFRESH_JWT_SECRET;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey!, {
      expiresIn: "30m",
    });
    const refreshToken = uuidv4();

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      // expires in 30 minutes
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    res.json({ token, refreshToken });
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (user[0] === 1) {
      res.json({ message: "User updated successfully." });
    } else {
      res.json({ message: "User not found." });
    }
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};
