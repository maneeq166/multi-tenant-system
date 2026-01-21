import { Router } from "express";
import { createOrganizationController } from "../controller/organizations.controller.js";
const orgRouter = Router();

orgRouter.post("/",createOrganizationController);