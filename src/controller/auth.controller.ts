import { loginService, registerService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler/index.js";
import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse/index.js";

export const registerController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await registerService(email, password);

    const { message, statusCode, data } = result;

    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, data, message));
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await loginService(email, password);

    const { message, statusCode, data } = result;

    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, data, message));
  },
);
