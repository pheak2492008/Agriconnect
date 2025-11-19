import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User, { IUser } from "../model/usermodel";
import { ObjectId } from "mongoose";

// Generate JWT token
const generateToken = (userID: string): string => {
  const secret: Secret = process.env.JWT_SECRETKEY as Secret;

  if (!secret) {
    throw new Error("JWT_SECRETKEY is not defined");
  }

  const expiresIn: string = process.env.JWT_EXPIRES_IN || "7d";

  const options: SignOptions = {
    expiresIn: expiresIn as unknown as import("ms").StringValue, // ✅ cast to StringValue
  };

  return jwt.sign({ id: userID }, secret, options);
};

// Input type for registration (exclude Mongoose Document props)
interface IUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

// ------------------------
// REGISTER SERVICE
// ------------------------
export const registerService = async (
  req: Request
): Promise<{ user: Partial<IUser>; token: string }> => {
  const { name, email, password, phone } = req.body;

  // 1️⃣ Check if email already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error("Email already exists");

  // 2️⃣ Check if phone already exists (optional)
  if (phone) {
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) throw new Error("Phone number already in use");
  }

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4️⃣ Create user with proper typing
  const userInput: IUserInput = {
    name,
    email,
    password: hashedPassword,
    phone,
    role: "farmer", // default role
    isActive: true,
  };

  const newUser = await User.create(userInput);

  // 5️⃣ Generate JWT token
  const token = generateToken((newUser._id as ObjectId).toString());

  // 6️⃣ Return user (without password) and token
  return {
    user: {
      id: (newUser._id as ObjectId).toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isActive: newUser.isActive,
    },
    token,
  };
};

// ------------------------
// LOGIN SERVICE
// ------------------------
export const loginService = async (
  req: Request
): Promise<{ user: Partial<IUser>; token: string }> => {
  const { email, password } = req.body;

  // 1️⃣ Find user
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // 2️⃣ Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // 3️⃣ Check if active
  if (!user.isActive) throw new Error("Account is inactive");

  // 4️⃣ Generate token
  const token = generateToken((user._id as ObjectId).toString());

  // 5️⃣ Return user (without password) and token
  return {
    user: {
      id: (user._id as ObjectId).toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
    },
    token,
  };
};

// ------------------------
// LOGOUT SERVICE
// ------------------------
export const logoutService = async (): Promise<{ message: string }> => {
  // For JWT, logout is handled client-side by deleting the token
  return { message: "Logout successful" };
};
