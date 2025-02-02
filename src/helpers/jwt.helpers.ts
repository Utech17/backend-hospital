import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces";

const createToken = (user: UserInterface): Promise<string> => {
  const key = process.env.PRIVATE_KEY || "mediplus";
  return new Promise((resolve, reject) => {
    const payload = { id: user.id };
    jwt.sign(
      payload,
      key,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token as string); //enviamos el token
        }
      }
    );
  });
};

const verifyToken = (token: string) => {
  const key = process.env.PRIVATE_KEY || "mediplus";
  let decoded: any = {};
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    console.log("error en la verificacion");
  }
  return decoded;
};

export { createToken, verifyToken };
