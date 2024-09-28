import express from "express";
import { FitnessEquipment } from  "../controller/fitness_equipment.js";
const FitnessEquipmentRouter = express.Router();
const FitnessEquipmentController = new FitnessEquipment();
FitnessEquipmentRouter.get("/fitness_equipment",FitnessEquipmentController.getAll )
FitnessEquipmentRouter.get("/fitness_equipment/:t_z",FitnessEquipmentController.search )
FitnessEquipmentRouter.post("/fitness_equipment",FitnessEquipmentController.add )
FitnessEquipmentRouter.delete("/fitness_equipment/:t_z",FitnessEquipmentController.delete )
FitnessEquipmentRouter.put("/fitness_equipment/:t_z",FitnessEquipmentController.put )
export { FitnessEquipmentRouter }