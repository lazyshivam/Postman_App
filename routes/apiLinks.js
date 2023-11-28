const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ApiLink = require("../models/apiLinkModel");

// Get all API links for the authenticated user
router.get("/apiLinks", ensureAuthenticated, async (req, res) => {
  try {
    const apiLinks = await ApiLink.find({ user: req.user.id });
    res.status(200).json(apiLinks);
  } catch (error) {
    console.error("Error fetching API links:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new API link for the authenticated user
router.post("/apiLinks", ensureAuthenticated, async (req, res) => {
  try {
    const { title,url,method } = req.body;
    var userId=req.user.id;
    const newApiLink = new ApiLink({
      user:userId,
      title,
      url,
      method,
    });
    // console.log(newApiLink);
    const savedApiLink = await newApiLink.save();
    res.status(201).json(savedApiLink);
  } catch (error) {
    console.error("Error adding API link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an API link for the authenticated user
router.delete("/apiLinks/:id", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApiLink = await ApiLink.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    console.log("deleting the save api links",deletedApiLink);
    if (deletedApiLink) {
      res.status(200).json(deletedApiLink);
    } else {
      res.status(404).json({ error: "API link not found" });
    }
  } catch (error) {
    console.error("Error deleting API link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
