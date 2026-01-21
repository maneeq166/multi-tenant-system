import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler/index.js";
import { createOrganizationService } from "../services/organizations.service.js";
import {ApiResponse} from "../utils/apiResponse/index.js";
export const createOrganizationController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = (req as any).id;
    const { name } = req.body;

    const result = await createOrganizationService(id, name);
    const { message, statusCode, data } = result;

    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, data, message));
  },
);


