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
const hospital_model_1 = require("../models/hospital_model");
class HospitalController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, details, consultationFee, adminFee, additionalDiscount, image } = req.body;
                const totalAmount = consultationFee + adminFee + additionalDiscount;
                const hospital = new hospital_model_1.Hospital({
                    name,
                    details,
                    consultationFee,
                    adminFee,
                    additionalDiscount,
                    totalAmount,
                    image,
                });
                const result = yield hospital.save();
                return res.status(201).json(result);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: "Error creating hospital",
                    error: error,
                    status: "failed"
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const updatedHospital = yield hospital_model_1.Hospital.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
                if (!updatedHospital) {
                    return res.status(404).json({ message: "Hospital not found", status: "failed" });
                }
                return res.status(200).json(updatedHospital);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error updating hospital", error: error, status: "failed" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedHospital = yield hospital_model_1.Hospital.findByIdAndDelete(id);
                if (!deletedHospital) {
                    return res.status(404).json({ message: "Hospital not found", status: "failed" });
                }
                return res.json({ message: "Hospital deleted successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: "Error deleting hospital", "error": error, status: "failed" });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const hospital = yield hospital_model_1.Hospital.findById(id);
                if (!hospital) {
                    return res.status(404).json({ message: "Hospital not found" });
                }
                return res.json({ status: "success", hospital });
            }
            catch (error) {
                return res.status(500).json({ message: "Error fetching hospital", "error": error, status: "failed" });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hospitals = yield hospital_model_1.Hospital.find();
                return res.json({
                    "status": "success",
                    "data": hospitals
                });
            }
            catch (error) {
                return res.status(500).json({ message: "Error fetching hospitals", error });
            }
        });
    }
}
exports.default = new HospitalController();
