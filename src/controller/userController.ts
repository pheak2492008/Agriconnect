import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";

// Create a user
export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req);
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ data: users });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
