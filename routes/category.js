import express from "express";
import { Category } from  "../controller/category.js";
const categoryRouter = express.Router();
const categoryController = new Category();
categoryRouter.get("/",categoryController.getAll )
categoryRouter.get("/:t_z",categoryController.search )
categoryRouter.post("/",categoryController.add )
categoryRouter.delete("/:t_z",categoryController.delete )
categoryRouter.put("/:t_z",categoryController.put )
export { categoryRouter }