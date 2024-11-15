// import { error } from "console";

export const shutDown = async (error: unknown) => {
  console.error("UNEXPECTED APP ERROR", { error });
  process.exit(1);
};
