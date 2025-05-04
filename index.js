const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const customerController = require("./controllers/customerController");
const authController = require("./controllers/authController");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authController);
app.use("/api/customers", customerController);
// app.use("/api/loans", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const connectDB = require("./db");
// const { router, setDatabase } = require("./routes");

// const app = express();
// app.use(express.json());

// connectDB().then((database) => {
//   setDatabase(database);
//   app.use("/", router);
//   app.listen(3000, () => console.log("Server running on port 3000"));
// });
