const express = require("express");

const router = express.Router();


//@route Post api/profile/me
//@desc get user  user
//@access Private

router.get("/", (req, res) => res.send("Post route"));

module.exports = router;
