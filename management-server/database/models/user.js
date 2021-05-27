import mongoose from 'mongoose';
import validator from 'validator';
import config from 'config';
import ROLES_ARRAY from '../reference-data-files/roles';

let userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    contactName:{
        type: String,
        required: true
    },
    contactPhone:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    contactAddress1:{
        type: String,
        required: true
    },
    contactAddress2:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true,
        validate: (value) => {
            return value.length === 5
        }
    },
    password: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    permissions: {
        type: String,
        required: true,
        enum: ['SUPERADMIN', 'VENDOR'],
        validate: (value) => {
            return value.length > 0
        }
    },
    passwordResetToken: String,
    passwordResetExpires: Date
});

// The first param is the collection name this model represents
module.exports = mongoose.model(config.get('mongodb_collections.admins'), userSchema);