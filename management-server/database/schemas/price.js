import mongoose from 'mongoose';
import validator from 'validator';

let priceSchema = new mongoose.Schema({
    Little:{
        amount: {
            type: Number,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    },
    Normal:{
        amount: {
            type: Number,
            // required: true
        },
        value: {
            type: Number,
            // required: true
        }
    },
    Many:{
        amount: {
            type: Number,
            // required: true
        },
        value: {
            type: Number,
            // required: true
        }
    },
}, {_id: false})

module.exports = priceSchema; 