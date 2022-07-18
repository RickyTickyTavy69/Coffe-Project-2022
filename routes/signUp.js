let {Router} = require('express');
let router = Router();

router.get('/', async (req, res) => {
    
    res.render('auth/signUp', {
        title: 'Register Yourself',
        isSignUp: true
    });
})


module.exports = router;