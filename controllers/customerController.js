const Customer = require("../models/Customer");
const express = require("express");
const router = express.Router();

//middleware
const middleware = (req, res, next) => {
  const token = req.header("Authorization");
  //   ?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const authentication = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader) {
    jwtToken = authHeader.split(" ")[1];
  }

  if (jwtToken) {
    jwt.verify(jwtToken, "SECRET_KEY", (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.username = payload.username;
        request.userId = payload.userId;
        next();
      }
    });
  } else {
    response.status(401);
    response.send("Invalid JWT Token");
  }
};

// Create a new customer
router.post("/", middleware, async (req, res) => {
  try {
    const { name, phone, address, trustScore } = req.body;
    const customer = new Customer({
      name,
      phone,
      address,
      trustScore,
      createdBy: req.user.id,
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all customers
router.get("/", middleware, async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user.id });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a customer
router.put("/:id", middleware, async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a customer
router.delete("/:id", middleware, async (req, res) => {
  try {
    await Customer.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
