const phoneController = require("../controllers/phoneController");

const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(
    '<form action="/allocate_phone_number" method="POST"><h2>Enter Clinic Name:</h2><input type="text" name="clinic"><br/><h2>Enter Phone Number:</h2><input type="text" name="phone"><br/><br/><button type="submit">Hello</button></form>'
  );
});

router.post("/allocate_phone_number", phoneController.getPhoneNumber);

module.exports = router;
