import express from "express";
import { FitnessEquipmentImage } from  "../controller/fitness_equipment_image.js";
const FitnessEquipmentImageRouter = express.Router();
const FitnessEquipmentImageController = new FitnessEquipmentImage();
FitnessEquipmentImageRouter.get("/fitness_equipment_image",FitnessEquipmentImageController.getAll )
FitnessEquipmentImageRouter.get("/fitness_equipment_image/:t_z",FitnessEquipmentImageController.search )
FitnessEquipmentImageRouter.post("/fitness_equipment_image",FitnessEquipmentImageController.add )
FitnessEquipmentImageRouter.delete("/fitness_equipment_image/:t_z",FitnessEquipmentImageController.delete )
FitnessEquipmentImageRouter.put("/fitness_equipment_image/:t_z",FitnessEquipmentImageController.put )
export { FitnessEquipmentImageRouter }