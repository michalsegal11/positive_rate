import express from "express";
import { FitnessEquipmentImage } from  "../controller/fitness_equipment_image.js";
const FitnessEquipmentImageRouter = express.Router();
const FitnessEquipmentImageController = new FitnessEquipmentImage();
FitnessEquipmentImageRouter.get("/",FitnessEquipmentImageController.getAll )
FitnessEquipmentImageRouter.get("/:t_z",FitnessEquipmentImageController.search )
FitnessEquipmentImageRouter.post("/",FitnessEquipmentImageController.add )
FitnessEquipmentImageRouter.delete("/:t_z",FitnessEquipmentImageController.delete )
FitnessEquipmentImageRouter.put("/:t_z",FitnessEquipmentImageController.put )
export { FitnessEquipmentImageRouter }