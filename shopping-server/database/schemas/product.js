import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import validator from 'validator';
import config from 'config';
import * as _ from 'lodash';

// import weightSchema from './weight';
// import priceSchema from './price';
import auditLogSchema from './auditLog';
// import customizationOptions from './customizationOptions';

// import STORES_ARRAY from '../reference-data-files/stores.json';

let productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    store_sku: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: config.get('mongodb_collections.product_categories'),
        required: true
    },
    thumbnailUrls: {
        type: Array,
        of: String,
        validate: (value) => {
            for (let entry of value) {
                if(!(validator.isURL(entry, {allow_underscores: true}) && entry.includes("s3.amazonaws.com"))) {
                    return false;
                }
            }
            return true;
        }
    },
    featuredImageUrls: {
        type: Array,
        of: String,
        validate: (value) => {
            for (let entry of value) {
                if(!(validator.isURL(entry, {allow_underscores: true}) && entry.includes("s3.amazonaws.com"))) {
                    return false;
                }
            }
            return true;
        }
    },
    detailedImageUrls: {
        type: Array,
        of: String,
        validate: (value) => {
            for (let entry of value) {
                if(!(validator.isURL(entry, {allow_underscores: true}) && entry.includes("s3.amazonaws.com"))) {
                    return false;
                }
            }
            return true;
        }
    },
    details_html: {
        type: String,
        required: true,
        trim: true
    },
    auditLog: {
        type: auditLogSchema,
        required: true
    }
});

productSchema.index({ brand: 'text', name: 'text', store_sku: 'text', details_html: 'text'});

module.exports = productSchema;