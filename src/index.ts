import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.get("/test", (req, res) => {
  res.send("Test route is working");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Error occurred starting the server:", error);
});
