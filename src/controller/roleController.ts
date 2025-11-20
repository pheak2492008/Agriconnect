import { Request, Response } from "express";
import * as roleService from "../services/roleService";

const handleError = (res: Response, err: any) => {
  if (err.message.includes("not found"))
    return res.status(404).json({ success: false, message: err.message });
  if (err.message.includes("already exists"))
    return res.status(409).json({ success: false, message: err.message });
  return res
    .status(500)
    .json({ success: false, message: "Server error", error: err.message });
};

// Create Role
export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Role name is required" });

    const role = await roleService.createRoleService(name, description);
    return res
      .status(201)
      .json({ success: true, message: "Role created", data: role });
  } catch (err: any) {
    return handleError(res, err);
  }
};

// Get All Roles
export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRolesService();
    return res.status(200).json({ success: true, data: roles });
  } catch (err: any) {
    return handleError(res, err);
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await roleService.getRoleByIdService(req.params.id);
    return res.status(200).json({ success: true, data: role });
  } catch (err: any) {
    if (err.message === "INVALID_ID") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role ID" });
    }
    if (err.message === "NOT_FOUND") {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Update Role
export const updateRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const role = await roleService.updateRoleService(
      req.params.id,
      name,
      description
    );
    return res
      .status(200)
      .json({ success: true, message: "Role updated", data: role });
  } catch (err: any) {
    return handleError(res, err);
  }
};

// Delete Role
export const deleteRole = async (req: Request, res: Response) => {
  try {
    await roleService.deleteRoleService(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Role deleted successfully" });
  } catch (err: any) {
    return handleError(res, err);
  }
};
