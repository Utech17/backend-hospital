import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers";
import { UserServices } from "../services";
export const validateToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader: any = req.headers["x"];
  const { id } = verifyToken(authHeader);
  if (!id) {
    return res.status(401).json({ message: "Token invalido" });
  }
  const { data, message, status } = await UserServices.getOne(id);
  if (status === 500) {
    return res.status(status).json({ message, data });
  } else if (status === 404) {
    return res.status(404).json({ message, data });
  } else {
    req.userAuth = data?.user;
    if (data?.user?.status == false) {
      return res.status(401).json({ message: "Usuario deshabilitado" });
    }
    next();
  }
};
