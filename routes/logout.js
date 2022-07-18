let Router = require('express');

let router = Router();


router.get('/', async (req, res) => {
    req.session.destroy(() => {                                 // колбэк будет вызван, когда будут унечтожены все данные сессии.
        res.redirect('/signUp');
    });
    
})


module.exports = router;