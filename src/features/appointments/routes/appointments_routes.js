"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const book_appointment_controller_1 = __importDefault(require("../controllers/book_appointment_controller"));
exports.router = (0, express_1.Router)();
exports.router.post("/book", book_appointment_controller_1.default.book);
exports.router.put("/cancel/:id", book_appointment_controller_1.default.cancel);
exports.router.put("/complete", book_appointment_controller_1.default.complete);
exports.router.put("/confirm", book_appointment_controller_1.default.confirm);
exports.router.get("/", book_appointment_controller_1.default.getAll);
exports.router.get("/:id", book_appointment_controller_1.default.get);
