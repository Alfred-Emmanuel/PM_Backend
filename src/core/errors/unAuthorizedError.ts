import { HttpStatusCodes } from "../utils";
import { ApplicationError, ErrorDetailsDescriptor } from "./apiError";

export class UnAuthorizedError extends ApplicationError {
  _statusCode = HttpStatusCodes.UNAUTHORIZED;
  _message: string;
  _details = null;

  constructor(message: string) {
    super(message);
    this._message = message;

    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }

  get StatusCode(): number {
    return this._statusCode;
  }

  get message(): string {
    return this._message;
  }

  get details(): ErrorDetailsDescriptor {
    return this._details;
  }
}
