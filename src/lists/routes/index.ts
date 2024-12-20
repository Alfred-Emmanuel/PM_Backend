// import * as express from "express"
import express, { Request, Response } from "express";
import { List } from "../models";
import { createListSchema } from "../../auth";
import { validateRequestBody, validateRequestParams } from "../../auth";

export const listsRouter = express.Router();

listsRouter
  .get("/get_lists", async (req: Request, res: Response) => {
    try {
      const ownerId = req.user?.id; // Get the current user's ID

      // if (!ownerId) {
      //   res.status(401).json({
      //     success: false,
      //     message: "Unauthorized. User ID is missing.",
      //   });
      // }

      // Fetch boards where the ownerId matches the user's ID
      const lists = await List.findAll({
        where: { ownerId },
      });

      res.status(200).json({
        success: true,
        data: lists,
      });
    } catch (error) {
      console.error("Error fetching lists:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching lists.",
      });
    }
  })
  .post(
    "/create",
    validateRequestBody(createListSchema.inputSchema),
    async (req: Request, res: Response) => {
      const { title, kanbanBoardId } = req.body;
      // const ownerId = req.user?.id;

      try {
        const list = await List.create({
          title,
          kanbanBoardId,
        });
        res.status(201).json(list);
      } catch (error) {
        console.error("Error creating project: ", error);
        res.status(500).json({ message: "Error creating list", error });
      }
    }
  );
