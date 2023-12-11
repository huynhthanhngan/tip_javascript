'use strict';

//!dmbg
const {model, Schema, Types} = require('mongoose')
const DOCUMENT_SHOP = 'Shop'
const COLECTION_NAME = 'Shops'

const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const shopSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxLength:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    verfify:{
      enum: ['active', 'inactive'],
      default: false,
  },
  roles:{
    type: Array,
    default: [],
  }
}, {
  timestamps: true,
  collection: COLECTION_NAME
});

//Export the model
module.exports = mongoose.model('User', userSchema);