import Permissions from "../models/permissions.model";

export const revokePermission = async (permissionId: number) => {
  const permission = await Permissions.findByPk(permissionId);
  if (!permission) throw new Error("Permission not found");

  await permission.destroy();
  return { message: "Permission revoked successfully" };
};
