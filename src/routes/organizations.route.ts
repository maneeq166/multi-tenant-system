import { Router } from "express";
import { createOrganizationController } from "../controller/organizations.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const orgRouter = Router();

orgRouter.use(authMiddleware);

orgRouter.post("/",createOrganizationController);