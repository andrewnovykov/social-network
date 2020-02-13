const express = require("express");

const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route Post api/profile/me
//@desc get user  user
//@access Private


router.get("/me", auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({msg: 'there is no profile for this user'})
        }

        res.json(profile);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;
