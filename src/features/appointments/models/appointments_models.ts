import { Schema, model, Document, Types } from "mongoose";

export interface AppointmentDocument extends Document {
    hospital: Types.ObjectId;
    patientId: Types.ObjectId;
    appointmentDate: Date;
    reason?: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    createdAt: Date;
    updatedAt: Date;
    totalAmount: number;
    // consultationFee: number;
    // adminFee: number;
    // additionalDiscount: number;
}



const appointmentSchema = new Schema<AppointmentDocument>(
    {
        hospital: {
            type: Schema.Types.ObjectId,
            ref: "Hospital",
            required: true,
        },
        patientId: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
    }
);


appointmentSchema.index({ patientId: 1, hospital: 1, appointmentDate: 1 }, { unique: true });

export const Appointment = model<AppointmentDocument>("Appointment", appointmentSchema);