const {Router} = require('express');
const router = Router();
let path = require('path');
let fs = require('fs');



router.get('/', async (req, res) => {
    
    let totalprice = 0;

    res.render('index', {
        title: 'Best Coffee In Town',
        isHome: true
    });

})


module.exports = router;