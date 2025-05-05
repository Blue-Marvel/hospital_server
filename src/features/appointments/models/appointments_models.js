"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    hospital: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
    },
    patientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending",
    },
    totalAmount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});
appointmentSchema.index({ patientId: 1, hospital: 1, appointmentDate: 1 }, { unique: true });
exports.Appointment = (0, mongoose_1.model)("Appointment", appointmentSchema);
