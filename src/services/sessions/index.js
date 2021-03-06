'use strict';

const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');
const hooks = require('./hooks');

module.exports = function(){
  var app = this;
  //console.log(app)
  const stingurl = app.get('mongodb');
  if(stingurl == "process.env.MONGODB_URI"){
    console.log("if")
    const urlstr = eval(stingurl);
    var url = urlstr.toString();
  }else{
    var url = stingurl
    console.log(url)
    console.log("esle")
  }
  MongoClient.connect(url).then(function(db){
  // Connect to the db, create and register a Feathers service.
  app.use('/sessions', service({
    Model: db.collection('sessions'),
    paginate: {
      default: 500,
      max: 1000
    }
  }));

  // Get our initialize service to that we can bind hooks
  var sessionsService = app.service('/sessions');

  // Set up our before hooks
  sessionsService.before(hooks.before);

  // Set up our after hooks
  sessionsService.after(hooks.after);

  });
};
