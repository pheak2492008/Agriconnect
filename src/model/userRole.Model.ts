import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserRole extends Document {
  user_id: Types.ObjectId;  // FK to User
  role_id: number;          // FK to Role
}

const userRoleSchema = new Schema<IUserRole>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    role_id: {
      type: Number,
      ref: "Role",
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Optional: prevent assigning same role twice to a user
userRoleSchema.index({ user_id: 1, role_id: 1 }, { unique: true });

const UserRole = mongoose.model<IUserRole>("UserRole", userRoleSchema);

export default UserRole;
