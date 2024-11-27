import Permissions from "../models/permissions.model";
import { AccessLevels } from "../types";

export const updatePermission = async (
  permissionId: number,
  accessLevel: AccessLevels
) => {
  const permission = await Permissions.findByPk(permissionId);
  if (!permission) throw new Error("Permission not found");

  permission.accessLevel = accessLevel;
  await permission.save();
  return permission;
};
