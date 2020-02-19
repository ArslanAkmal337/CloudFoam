// key.js - figure out what set credentials to return

if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod");
} 


//there was no ./dev file found thats why I commented 

// else {
  // we are in dev
  // module.exports = require("./dev");
// }
