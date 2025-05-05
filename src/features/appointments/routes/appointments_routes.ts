import express, { Router } from "express";
import bookAppointment from "../controllers/book_appointment_controller";

export const router: Router = Router();

router.post("/book", bookAppointment.book);
router.put("/cancel/:id", bookAppointment.cancel);
router.put("/complete", bookAppointment.complete);
router.put("/confirm", bookAppointment.confirm);
router.get("/", bookAppointment.getAll);
router.get("/:id", bookAppointment.get);

