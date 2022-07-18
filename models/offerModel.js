const {Schema, model} = require('mongoose');

offerSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


module.exports = model('Offer', offerSchema);