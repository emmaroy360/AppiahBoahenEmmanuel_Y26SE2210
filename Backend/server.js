const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./routes/Routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://appiahboahenemmanuely26se2210.vercel.app",
  })
);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api", Routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
