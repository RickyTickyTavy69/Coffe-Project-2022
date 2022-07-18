let {Router} = require('express');
let router = Router();

let path = require('path');
let fs = require('fs');


let User = require('../models/userModel');
const Menu = require('../models/menuModel');


router.delete('/delete/:id', async (req, res) => {

    await req.user.removeFromCart(req.params.id);
    
    let cardObj = await req.user.cart.items;

    res.json(cardObj);
})



router.get('/save/:type', async (req, res) => {

    

    let type = req.params.type;

    let menuArray = await Menu.find();
    let menuItems = menuArray[0].items;

    let offer = menuItems.find( (item) => {
    return String(item.type) === String(type);
    })
      
    await req.user.addToCart( offer );
    res.redirect('/');
            
        
}) 

    
        
   

        
        
        
        
        
                                   
                     
    
    


module.exports = router;