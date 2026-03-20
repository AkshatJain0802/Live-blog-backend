require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Live Blog API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});