import { Request, Response } from "express";
import {
  registerService,
  loginService,
  logoutService,
} from "../services/authService";

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await registerService(req);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const result = await logoutService();
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
