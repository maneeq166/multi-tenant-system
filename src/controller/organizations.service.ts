import type { NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler/index.js";
import { createOrganizationService } from "../services/organizations.service.js";
export const createOrganizationController = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.id;
    const {name} = req.body;

    const result = await createOrganizationService(id,name);
    const { message, statusCode, data } = result;

    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, data, message));
});