
import express from "express";
import { Teachers } from  "../controller/teachers.js";
const teachersRouter = express.Router();
const teachersController = new Teachers();
teachersRouter.get("/",teachersController.getAll )
teachersRouter.get("/:t_z",teachersController.search )
teachersRouter.post("/",teachersController.add )
teachersRouter.delete("/:t_z",teachersController.delete )
teachersRouter.put("/:t_z",teachersController.put )
export { teachersRouter }