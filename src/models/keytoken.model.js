'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLECTION_NAME = 'Keys'

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Shop',
    },
    publicKey:{
        type: String,
        required:true,
    },
    refreshTokenUsed:{
        type: Array, default: [] //nhung RF token da duoc su dung
    }, 
    refreshToken: {
        collection: COLECTION_NAME,
        timestamps: true
    }
}, {
        collection: COLECTION_NAME,
        timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);