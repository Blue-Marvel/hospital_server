"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hospital = void 0;
const mongoose_1 = require("mongoose");
const hospitalSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Hospital = (0, mongoose_1.model)("Hospital", hospitalSchema);
