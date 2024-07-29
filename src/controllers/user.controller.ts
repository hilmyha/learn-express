import { Request, Response } from "express";
import User from "../models/user.model";

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
    const user = await User.create(req.body);
    res.json(user);
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