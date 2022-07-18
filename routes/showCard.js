let {Router} = require('express');
let router = Router();
let fs = require('fs');
let path = require('path');


router.get('/', async (req, res) => {

    let user = await req.session.user;
   
    let items = user.cart.items;
    
    let totalprice = 0;
    

    items.forEach( (item) => {
       let amount = item.amount;                                                                                //вычесляем сумму цен на все продукты 
       totalprice = (Number(totalprice) + ( Number(item.price) * Number(amount)));                              
       totalprice = Number(totalprice).toFixed(2);
    })

    res.render('card', {itemsObj: items, totalPrice: totalprice});
    
})

module.exports = router;