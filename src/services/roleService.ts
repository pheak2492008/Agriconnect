import { roleModel, IRole } from "../model/roleModel";
import mongoose from "mongoose";

export const createRoleService = async (
  name: string,
  description?: string
): Promise<IRole> => {
  // Check if role already exists
  const exists = await roleModel.findOne({ name });
  if (exists) throw new Error("Role already exists");

  return roleModel.create({ name, description });
};

export const getAllRolesService = async (): Promise<IRole[]> => {
  return roleModel.find();
};

export const getRoleByIdService = async (id: string): Promise<IRole> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("INVALID_ID");
  }

  const role = await roleModel.findById(id);
  console.log(role);
  if (!role) throw new Error("NOT_FOUND");

  return role;
};

export const updateRoleService = async (
  id: string,
  name?: string,
  description?: string
): Promise<IRole | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid role ID");

  const role = await roleModel.findById(id);
  if (!role) throw new Error("Role not found");

  if (name) role.name = name;
  if (description !== undefined) role.description = description;

  return role.save();
};

export const deleteRoleService = async (id: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid role ID");

  const role = await roleModel.findByIdAndDelete(id);
  if (!role) throw new Error("Role not found");
};
