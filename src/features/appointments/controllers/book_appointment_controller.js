"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointments_models_1 = require("../models/appointments_models");
class BookAppointmentController {
    book(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { hospital, patientId, appointmentDate, reason, totalAmount } = req.body;
                const appointment = new appointments_models_1.Appointment({ hospital, patientId, appointmentDate, reason, totalAmount });
                const result = yield appointment.save();
                const populateAppointment = yield appointments_models_1.Appointment.findById(result._id).populate("hospital").exec();
                return res.status(201).json({ "status": "success", "data": populateAppointment });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error creating appointment", "error": error, status: "failed" });
            }
        });
    }
    cancel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const model = yield appointments_models_1.Appointment.findById(id);
                if (!model) {
                    return res.status(404).json({ message: "Appointment not found", status: "failed" });
                }
                model.status = "cancelled";
                const result = yield model.save();
                const populateAppointment = yield appointments_models_1.Appointment.findById(result._id).populate("hospital").exec();
                return res.status(200).json({ "status": "success", "data": populateAppointment });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error canceling appointment", "error": error, status: "failed" });
            }
        });
    }
    confirm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const model = yield appointments_models_1.Appointment.findById(id);
                if (!model) {
                    return res.status(404).json({ message: "Appointment not found", status: "failed" });
                }
                model.status = "confirmed";
                const result = yield model.save();
                const populateAppointment = yield appointments_models_1.Appointment.findById(result._id).populate("hospital").exec();
                return res.status(200).json({ "status": "success", "data": populateAppointment });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error confirming appointment", "error": error, status: "failed" });
            }
        });
    }
    complete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const model = yield appointments_models_1.Appointment.findById(id);
                if (!model) {
                    return res.status(404).json({ message: "Appointment not found", status: "failed" });
                }
                model.status = "completed";
                const result = yield model.save();
                const populateAppointment = yield appointments_models_1.Appointment.findById(result._id).populate("hospital").exec();
                return res.status(200).json({ "status": "success", "data": populateAppointment });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error completing appointment", "error": error, status: "failed" });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const model = yield appointments_models_1.Appointment.findById(id);
                if (!model) {
                    return res.status(404).json({ message: "Appointment not found", status: "failed" });
                }
                return res.status(200).json({ "status": "success", "data": model });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error fetching appointment", "error": error, status: "failed" });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const models = yield appointments_models_1.Appointment.find().populate("hospital").exec();
                return res.status(200).json({ "status": "success", "data": models });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error fetching appointments", "error": error, status: "failed" });
            }
        });
    }
}
exports.default = new BookAppointmentController();
