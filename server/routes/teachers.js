
import express from "express";
import { Teachers } from  "../controller/teachers.js";
const teachersRouter = express.Router();
const teachersController = new Teachers();
teachersRouter.get("/teachers",teachersController.getAll )
teachersRouter.get("/teachers/:t_z",teachersController.search )
teachersRouter.post("/teachers",teachersController.add )
teachersRouter.delete("/teachers/:t_z",teachersController.delete )
teachersRouter.put("/teachers/:t_z",teachersController.put )
export { teachersRouter }