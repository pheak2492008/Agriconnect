import { Schema, model, Types } from "mongoose";

const userRoleSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  roleId: { type: Types.ObjectId, ref: "Role", required: true },
});

export const userRoleModel = model("UserRole", userRoleSchema);
