import mongoose from 'mongoose';
import config from 'config';
import mongoosePaginator from 'mongoose-paginate';
import priceSchema from '../schemas/price';

let productPrice = new mongoose.Schema({
    productID:{
        type: String,
        ref: config.get('mongodb_collections.curated_products'),
        required: true
    },
    price:{
        type: priceSchema,
        required: true
    },
    inStock:{
        type: Number,
        required: true
    },
    deliveryArea:{
        type: [String],
        ref: config.get('mongodb_collections.delivery_area'),
        required: true,
    },
    inSale:{
        type: Boolean,
        required: true,
    },
    vendor: {
        type: String,
        ref: config.get('mongodb_collections.admins'),
        required: true
    },
});

productPrice.plugin(mongoosePaginator);
// The first param is the collection name this model represents
module.exports = mongoose.model(config.get('mongodb_collections.price_products'), productPrice);