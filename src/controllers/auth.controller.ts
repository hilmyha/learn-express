import dotenv from "dotenv";
import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import RefreshToken from "../models/refreshtoken.model";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const registerUser = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Internal server error." });
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
      // expires in 7 days
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.json({
      token,
      refreshToken,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error: any) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      await RefreshToken.destroy({
        where: {
          token: refreshToken,
        },
      });
    }
    res.json({ message: "User logged out successfully." });
  } catch (error: any) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const loadUser = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email"],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error: any) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Invalid refresh token." });
    }

    const storedToken = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!storedToken) {
      return res.status(400).json({ message: "Invalid refresh token." });
    }

    if (new Date() > storedToken.expiresAt) {
      return res.status(400).json({ message: "Refresh token expired." });
    }

    const user = await User.findOne({
      where: {
        id: storedToken.userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey!, {
      expiresIn: "30m",
    });

    res.json({ token });
  } catch (error: any) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};
