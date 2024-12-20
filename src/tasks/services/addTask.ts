import { Task } from "../models";

/**
 * Function to add a new task.
 * @param title - The title of the task.
 * @param status - The status of the task.
 * @param listId - The ID of the list to which the task belongs.
 */
export const addTask = async (
  title: string,
  status: string,
  listId: number
) => {
  try {
    const newTask = await Task.create({ title, status, listId });
    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
