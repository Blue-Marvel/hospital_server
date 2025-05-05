"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./utils/database/db"));
const hospital_router_1 = require("./features/hospitals/routers/hospital_router");
const appointments_routes_1 = require("./features/appointments/routes/appointments_routes");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use("/hospitals", hospital_router_1.router);
app.use("/appointments", appointments_routes_1.router);
app.get("/", (req, res) => {
    // const data = req.body; // Assuming data is sent in JSON format
    // Process the data...
    // console.log("Received data:", data);
    res.status(200).json({ message: "Data received successfully" });
});
// app.use("/users", authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
