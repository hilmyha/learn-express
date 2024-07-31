import { Request, Response, NextFunction } from "express";

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not authenticated" });
  }

  if (user.isAdmin !== true) {
    // Misalkan `1` adalah ID atau nilai peran untuk admin
    console.log("User: ", user);

    return res
      .status(403)
      .json({ message: "Forbidden: Admin role required", user: user });
  }

  next();
};

export default isAdminMiddleware;
