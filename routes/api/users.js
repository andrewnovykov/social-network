const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


//@route Post api/users
//@desc Register user
//@access Public
router.post('/', [

    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please includ a valid email').isEmail(),
    check('password', 'pass shoud be 6 or more chaeractrers').isLength({min: 6}),
    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { name, email, password  } = req.body;

    try {
          //see if user exist
          let user = await User.findOne({email: email});

          if(user) {
             return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
          }

          //get users gravatar
          const avatar = gravatar.url(email, {

              s: '200',
              r: 'pg',
              d: 'mm'

          })

          //Create user
          user = new User({
            name, 
            email,
            avatar,
            password
          })


          //encript password
            // - create salt
            // - hash pass
            // save user

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //return jsonwebtoken


        res.send('User registred')
          
        } catch(err) {

        console.error(err.message);
        res.status(500).send('Server error')  

    }









});

module.exports = router;