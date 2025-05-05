"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const hospital_controller_1 = __importDefault(require("../controller/hospital_controller"));
exports.router = express_1.default.Router();
exports.router.post("/create", hospital_controller_1.default.create);
exports.router.put("/:id", hospital_controller_1.default.update);
exports.router.delete("/:id", hospital_controller_1.default.delete);
exports.router.get("/:id", hospital_controller_1.default.get);
exports.router.get("/", hospital_controller_1.default.getAll);
