import express from "express";
import hospitalController from "../controller/hospital_controller";

export const router = express.Router();

router.post("/create", hospitalController.create);
router.put("/:id", hospitalController.update);
router.delete("/:id", hospitalController.delete);
router.get("/:id", hospitalController.get);
router.get("/", hospitalController.getAll);