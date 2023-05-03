import { Response } from "express";
import prisma from "../../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res: Response, next) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    req.status(401);
    req.json({ message: "wrong credentials!" });
    return;
  }

  const token = createJWT(user);
  res.cookie("auth", "auth", { httpOnly: true });
  res.json({ token });
};
