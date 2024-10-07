import express from "express";
import { Medial_lessons } from  "../controller/medial_lessons.js";
const medial_lessonsRouter = express.Router();
const medial_lessonsController = new Medial_lessons();
medial_lessonsRouter.get("/medial_lessons",medial_lessonsController.getAll )
medial_lessonsRouter.get("/medial_lessons:t_z",medial_lessonsController.search )
medial_lessonsRouter.post("/medial_lessons",medial_lessonsController.add )
medial_lessonsRouter.delete("/medial_lessons/:t_z",medial_lessonsController.delete )
medial_lessonsRouter.put("/medial_lessons/:t_z",medial_lessonsController.put )
export { medial_lessonsRouter }
