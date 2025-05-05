import { Request, Response } from "express";
import { Hospital } from "../models/hospital_model";

class HospitalController {

    async create(req: Request, res: Response): Promise<any> {
        try {
            const { name, details, consultationFee, adminFee, additionalDiscount, image } = req.body;

            const totalAmount = consultationFee + adminFee + additionalDiscount;

            const hospital = new Hospital({
                name,
                details,
                consultationFee,
                adminFee,
                additionalDiscount,
                totalAmount,
                image,
            });

            const result = await hospital.save();
            return res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error creating hospital",
                error: error,
                status: "failed"
            });
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const updatedHospital = await Hospital.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

            if (!updatedHospital) {
                return res.status(404).json({ message: "Hospital not found", status: "failed" });
            }
            return res.status(200).json(updatedHospital);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error updating hospital", error: error, status: "failed" });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const deletedHospital = await Hospital.findByIdAndDelete(id);

            if (!deletedHospital) {
                return res.status(404).json({ message: "Hospital not found", status: "failed" });
            }

            return res.json({ message: "Hospital deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting hospital", "error": error, status: "failed" });
        }
    }

    async get(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return res.status(404).json({ message: "Hospital not found" });
            }
            return res.json({ status: "success", hospital });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching hospital", "error": error, status: "failed" });

        }
    }

    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const hospitals = await Hospital.find();
            return res.json({
                "status": "success",
                "data": hospitals
            });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching hospitals", error });
        }
    }

}

export default new HospitalController();