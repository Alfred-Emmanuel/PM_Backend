import { Request, Response, NextFunction } from "express";
import { config, UnAuthorizedError } from "../../core";
import { TokenService } from "../helpers";

export class CurrentUser {
  constructor(private readonly tokenService: TokenService) {}

  handle: (req: Request, _: Response, next: NextFunction) => void = (
    req,
    res,
    next
  ) => {
    const tokenHeader = req.get("Authorization") || req.get("x-Auth-Token");

    let tokenDetails;
    try {
      if (!tokenHeader) {
        console.error("Authorization header missing");
        return res
          .status(401)
          .json({ message: "Authorization header is missing" });
        // throw new UnAuthorizedError("Unauthorized - Token missing");
      }

      const token = tokenHeader.split(" ").pop() as string;
      console.log("Received Token:", token);

      if (!token) {
        console.error("No token provided");
        return res.status(401).json({ message: "No token provided" });
      }

      tokenDetails = this.tokenService.verifyToken(
        token,
        config.auth.accessTokenSecret
      );
      console.log("Token Details:", tokenDetails);

      if (!tokenDetails) {
        console.error("Token details are null or undefined");
        req.user = undefined;
        return next(new Error("Invalid token"));
      }
    } catch (err: any) {
      req.user = undefined;
      const error = new Error(err.message);
      next(error);
      return;
    }

    // Add user details to the request object
    const payload = {
      email: tokenDetails.email,
      id: tokenDetails.id,
    };

    req.user = payload;
    next();
  };
}
