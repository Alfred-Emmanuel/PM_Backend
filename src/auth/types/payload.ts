import { ContextTypes } from "../../core";
import { IJwtData } from "./interfaces";

export interface SignInPayload extends ContextTypes {
  input: {
    email: string;
    password: string;
  };
}

export interface SignUpPayload extends ContextTypes {
  input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}

export interface LogoutPayload extends ContextTypes {
  user: IJwtData;
}
