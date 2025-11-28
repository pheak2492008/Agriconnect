import { Request } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import { userRoleModel } from "../model/userRole.Model";
import { roleModel } from "../model/roleModel";

// Create a new user with farmer role
export const createUser = async (req: Request) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) throw new Error("Name, email, and password are required");

  // Check if user exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("User with this email already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 1️⃣ Create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    isActive: true,
  });

  // 2️⃣ Assign the farmer role
  let farmerRole = await roleModel.findOne({ name: "farmer" });
  if (!farmerRole) {
    farmerRole = await roleModel.create({ name: "farmer", description: "Farmer role" });
  }

  await userRoleModel.create({
    userId: user._id,
    roleId: farmerRole._id,
  });

  // 3️⃣ Fetch roles for response
  const userRoles = await userRoleModel.find({ userId: user._id }).populate("roleId");
  const roles = userRoles.map((ur) => (ur.roleId as any).name);

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    isActive: user.isActive,
    roles,
  };
};

// Get all users
export const getAllUsers = async () => {
  const users = await userModel.find();
  const results = [];

  for (const user of users) {
    const userRoles = await userRoleModel.find({ userId: user._id }).populate("roleId");
    const roles = userRoles.map((ur) => (ur.roleId as any).name);

    results.push({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isActive: user.isActive,
      roles,
    });
  }

  return results;
};
