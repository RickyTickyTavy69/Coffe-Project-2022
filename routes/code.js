let {Router} = require('express');
let router = Router();
let code = require('./signed').code;

router.post('/', function(req, res){
    let codeValidation = (code === req.body.validationCode);
    res.render('auth/signedValidation', {'codeValidation' : codeValidation});
})


module.exports = router;