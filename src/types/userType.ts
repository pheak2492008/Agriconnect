import { Types } from "mongoose";

/**
 * Base User interface for Mongoose
 */
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string | number;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Response user type for API
 */
export type UserResponse = {
  _id: string;
  name: string;
  email: string;
  phone: string | number;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
};
