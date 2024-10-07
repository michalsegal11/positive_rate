import express from "express";
import { User } from  "../controller/users.js";
const userRouter = express.Router();
const userController = new User();
userRouter.get("/users/",userController.getAll )
userRouter.get("/users/:id",userController.search )
userRouter.post("/users/",userController.add )
userRouter.delete("/users/:t_z",userController.delete )
userRouter.put("/users/:t_z",userController.put )
export { userRouter }