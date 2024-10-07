import express from "express";
import { Category } from  "../controller/category.js";
const categoryRouter = express.Router();
const categoryController = new Category();
categoryRouter.get("/category",categoryController.getAll )
categoryRouter.get("/category/:id",categoryController.search )
categoryRouter.post("/category",categoryController.add )
categoryRouter.delete("/category/:id",categoryController.delete )
categoryRouter.put("/category/:id",categoryController.put )
export { categoryRouter }