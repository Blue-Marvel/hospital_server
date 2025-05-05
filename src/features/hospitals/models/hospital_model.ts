import { Schema, model, Document, } from "mongoose";

export interface HospitalDocument extends Document {
    name: string
    details: string
    consultationFee: number
    adminFee: number
    additionalDiscount: number
    totalAmount: number
    image: string
    createdAt: Date
    updatedAt: Date
}

const hospitalSchema = new Schema<HospitalDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        consultationFee: {
            type: Number,
            required: true,
        },
        adminFee: {
            type: Number,
            required: true,
        },
        additionalDiscount: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)
export const Hospital = model("Hospital", hospitalSchema);