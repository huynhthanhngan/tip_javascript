'use strict';

const mongoose = require('mongoose');

const connectString = 'mongodb://localhost:27017/shopDEV'

mongoose.connect(connectString).then( _ => console.log('connected successfully mongodb'))
.catch(err => console.log('error connecting'))

//dev
if(1 === 0) {
  mongoose.set('debug', true);
  mongoose.set('debug', { color : true});
}

module.exports = mongoose