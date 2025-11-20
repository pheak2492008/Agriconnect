import { Request } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import { roleModel } from "../model/roleModel";
import { userRoleModel } from "../model/userRole.Model";
import { generateToken } from "../utils/jwt";
import { tokenPayload } from "../types/auth";
import { UserResponse } from "../types/userType";

export const registerService = async (req: Request) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone || !address) {
    throw new Error("Missing required fields");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    isActive: true,
  });

  // Default "customer" role
  let customerRole = await roleModel.findOne({ name: "customer" });
  if (!customerRole) {
    customerRole = await roleModel.create({
      name: "customer",
      description: "Default role",
    });
  }

  await userRoleModel.create({ userId: user._id, roleId: customerRole._id });

  const userRoles = await userRoleModel
    .find({ userId: user._id })
    .populate("roleId");
  const roles = userRoles.map((ur) => (ur.roleId as any).name);

  const payload: tokenPayload = {
    _id: user._id.toString(),
    email: user.email,
    roles,
  };
  const token = generateToken(payload);

  const userObj: UserResponse = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    isActive: user.isActive ?? true,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    roles,
  };

  return { user: userObj, token };
};

export const loginService = async (req: Request) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("Missing email or password");

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Invalid email or password");

  const userRoles = await userRoleModel
    .find({ userId: user._id })
    .populate("roleId");
  const roles = userRoles.map((ur) => (ur.roleId as any).name);

  const payload: tokenPayload = {
    _id: user._id.toString(),
    email: user.email,
    roles,
  };
  const token = generateToken(payload);

  const userObj: UserResponse = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    isActive: user.isActive ?? true,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    roles,
  };

  return { user: userObj, token };
};

export const logoutService = async () => {
  return { message: "Logged out successfully" };
};
