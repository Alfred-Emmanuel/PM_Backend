import express, { Request, Response } from "express";
import { addTask } from "../services/addTask";
import { List } from "../../lists/models";
import { Task } from "../models";

export const taskRouter = express.Router();

taskRouter
  .get("/fetch_tasks/:listId", async (req: Request, res: Response) => {
    const { listId } = req.params;

    try {
      // Ensure the list exists
      const list = await List.findByPk(listId);
      if (!list) {
        res.status(404).json({ message: "List not found" });
        return;
      }

      // Fetch all tasks associated with the list
      const tasks = await Task.findAll({
        where: { listId },
        order: [["createdAt", "ASC"]],
      });

      // Respond with the tasks
      res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .post("/create/:listId", async (req: Request, res: Response) => {
    const { title, status = "Pending" } = req.body;
    const { listId } = req.params;
    //   const ownerId = req.user?.id;

    // Validate the request body
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    try {
      // Ensure the list exists
      const list = await List.findByPk(listId);
      if (!list) {
        res.status(404).json({ message: "List not found" });
        return;
      }

      // Create the task
      const newTask = await addTask(title, status, Number(listId));

      // Respond with the newly created task
      res
        .status(201)
        .json({ message: "Task created successfully", task: newTask });
    } catch (error: any) {
      console.error("Error creating task:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
