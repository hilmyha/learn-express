import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user || !user.id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not authenticated" });
  }

  try {
    // Ambil data pengguna dari database
    const dbUser = await User.findOne({
      where: { id: user.id },
    });

    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Periksa apakah pengguna adalah admin
    if (dbUser.isAdmin !== true) {
      // Misalkan `true` adalah nilai untuk admin
      console.log("User is not admin:", dbUser); // Debugging log
      return res
        .status(403)
        .json({ message: "Forbidden: Admin role required" });
    }

    next();
  } catch (error: any) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default isAdminMiddleware;
