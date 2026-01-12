import type { Request,Response,NextFunction } from "express";

exports.asyncHandler = fn => async (req:Request, res:Response, next:NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};