import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
role: {
  type: String,
  enum: ["admin", "farmer", "customer"],
  default: "customer",
},
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<IUser>("User", userSchema);
