const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const { check, validationResult } = require("express-validator");
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route Post api/auth
//@desc  
//@access Public

router.get("/", auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
         return res.status(500).json('Server error');
        
    }

});

//@route Post api/auth
//@desc auth user and get token user
//@access Public
router.post('/', [
   
    check('email', 'please includ a valid email').isEmail(),
    check('password', 'pass is required').exists(),
    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password  } = req.body;

    try {
          //see if user exist
          let user = await User.findOne({email: email});

          if(!user) {
             return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
          }


          //match passs

          const isMatch = await bcrypt.compare(password, user.password )

          if(!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ msg: "invalid credentials" }] });
          }


         

        //return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 3600000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );


      
          
        } catch(err) {

        console.error(err.message);
        res.status(500).send('Server error')  

    }









});




module.exports = router;
