import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validateRequestBody = (schema: Schema | undefined) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!schema) {
      res.status(500).json({
        message: "Validation schema is missing.",
      });
      return;
    }
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    } else {
      next();
    }
  };
};

 // Function to validate request parameters (params)
export const validateRequestParams = (schema: Schema | undefined) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!schema) {
      res.status(500).json({
        message: "Validation schema is missing.",
      });
      return;
    }

    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    } else {
      next();
    }
  };
};
