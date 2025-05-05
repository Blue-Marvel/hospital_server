import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/database/db";
import { router as hospitalRouter } from "./features/hospitals/routers/hospital_router";
import { router as appointmentRouter } from "./features/appointments/routes/appointments_routes";

dotenv.config();

dbConnection();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/hospitals", hospitalRouter);
app.use("/appointments", appointmentRouter);

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