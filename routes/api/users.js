const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check')


//@route Post api/users
//@desc Register user
//@access Public
router.post('/', [

    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please includ a valid email').isEmail(),
    check('password', 'pass shoud be 6 or more chaeractrers').isLength({min: 6}),
    
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    res.send("Usr route");
});

module.exports = router;