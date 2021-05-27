import mongoose from 'mongoose';
import config from 'config';
import mongoosePaginator from 'mongoose-paginate';

let DeliverArea = new mongoose.Schema({
    areaName:{
        type: String,
        required: true
    },
    zipCodes:{
        type: Array,
        required: true,
    },
    deliverCost:{
        type: Number,
        required: true,
    },
    minimumPurchase:{
        type: Number,
        required: true,
    },
    zipCodes:{
        type: Array,
        required: true,
    },
    vendor: {
        type: String,
        ref: config.get('mongodb_collections.admins'),
        required: true
    },
});

DeliverArea.plugin(mongoosePaginator);
// The first param is the collection name this model represents
module.exports = mongoose.model(config.get('mongodb_collections.delivery_area'), DeliverArea);