'use strict';
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000

//count connections
const countConect = () => {
  const numConections = mongoose.connections.length;
  console.log(`Number of connections::${numConections}`);
}


//check over load
const checkOverLoad = () => {
  setInterval( () => {
    const numConection = mongoose.connections.length
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //example maximum number of connections based on number of cores
    const maxConnections = numCores * 5;

    console.log(`Active connections: ${maxConnections}`)
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    if(numConection > maxConnections) {
      console.log(`Connection over load: ${numConection}`)
    }

  }, _SECONDS)
}
module.exports = {
  countConect,
  checkOverLoad
}