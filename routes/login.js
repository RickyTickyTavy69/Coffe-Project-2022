let {Router} = require('express');
const req = require('express/lib/request');
let router = Router();
let User = require('../models/userModel');

router.get( '/', async (req, res) => {
    res.render( 'auth/login', {
        isLogin: true,
        title: 'log into your account'
    })
})

router.post('/', async (req, res) => {

    const user = await User.findById('62329fb7a3d1fb0f634ceae6');
    
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(error => {
        if (error) {
            throw error;
        }
        res.redirect('/');
    })
    
})

module.exports = router;