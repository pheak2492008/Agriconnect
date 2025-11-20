import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  name: string; // "admin", "customer", "farmer"
  description?: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const roleModel = model<IRole>("Role", roleSchema);
