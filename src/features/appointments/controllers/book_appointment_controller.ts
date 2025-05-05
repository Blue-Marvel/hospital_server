import { Request, Response } from "express";
import { Appointment } from "../models/appointments_models";

class BookAppointmentController {
    async book(req: Request, res: Response): Promise<any> {
        try {
            const { hospital, patientId, appointmentDate, reason, totalAmount } = req.body;
            const appointment = new Appointment({ hospital, patientId, appointmentDate, reason, totalAmount });
            const result = await appointment.save();

            const populateAppointment = await Appointment.findById(result._id).populate("hospital").exec();

            return res.status(201).json({ "status": "success", "data": populateAppointment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error creating appointment", "error": error, status: "failed" });
        }
    }

    async cancel(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const model = await Appointment.findById(id);
            if (!model) {
                return res.status(404).json({ message: "Appointment not found", status: "failed" });
            }
            model.status = "cancelled";
            const result = await model.save();
            const populateAppointment = await Appointment.findById(result._id).populate("hospital").exec();

            return res.status(200).json({ "status": "success", "data": populateAppointment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error canceling appointment", "error": error, status: "failed" });
        }
    }

    async confirm(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const model = await Appointment.findById(id);
            if (!model) {
                return res.status(404).json({ message: "Appointment not found", status: "failed" });
            }
            model.status = "confirmed";
            const result = await model.save();
            const populateAppointment = await Appointment.findById(result._id).populate("hospital").exec();

            return res.status(200).json({ "status": "success", "data": populateAppointment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error confirming appointment", "error": error, status: "failed" });
        }
    }

    async complete(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const model = await Appointment.findById(id);
            if (!model) {
                return res.status(404).json({ message: "Appointment not found", status: "failed" });
            }
            model.status = "completed";
            const result = await model.save();
            const populateAppointment = await Appointment.findById(result._id).populate("hospital").exec();

            return res.status(200).json({ "status": "success", "data": populateAppointment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error completing appointment", "error": error, status: "failed" });
        }
    }


    async get(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const model = await Appointment.findById(id);
            if (!model) {
                return res.status(404).json({ message: "Appointment not found", status: "failed" });
            }
            return res.status(200).json({ "status": "success", "data": model });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching appointment", "error": error, status: "failed" });
        }
    }

    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const models = await Appointment.find().populate("hospital").exec();
            return res.status(200).json({ "status": "success", "data": models });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching appointments", "error": error, status: "failed" });
        }
    }
}


export default new BookAppointmentController();