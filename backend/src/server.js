const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "chatti-app-backend",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
