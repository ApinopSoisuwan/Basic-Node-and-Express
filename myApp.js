const bodyParser = require('body-parser');
var express = require('express');
var app = express();
require('dotenv').config();



/** Start a Working Express Server */
/**app.get("/",function(request,respone){
  respone.send('Hello Express')
})*/




/** Implement a Root-Level Request Logger Middleware  */
app.use(function(req , res , next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

/** Use body-parser to Parse POST Requests */
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




/** Serve an HTML File */
var html_path =  __dirname + "/views/index.html"
app.get("/",function(request,response){
  response.sendFile(html_path)
});


/** Serve Static Assets */
app.use('/public',express.static(__dirname + '/public'))


/** Serve JSON on a Specific Route */
/**app.get("/json",(request,response) => {
  respone.json({message: "Hello json"})
}) 



//** Use the .env File */
var message = {'message': "Hello json"} 
app.get('/json',(request,response, next) => {
    var jsonResponse = {'message': "HELLO JSON" };
    if (process.env.MESSAGE_STYLE === "uppercase") {
    response.json(jsonResponse);
  }
    response.json(message);
})


/** Chain Middleware to Create a Time Server  */
app.get('/now', function( req, res, next){
  req.time = new Date().toString()
  next();
},  function( req, res){
  res.send({time: req.time});
});

/** Get Route Parameter Input from the Client */

app.get('/:word/echo', function(req ,res ){
  var { word } = req.params;
  res.json({
    echo : word
  })
})


/** Get Query Parameter Input from the Client */

app.get('/name' , function(req ,res ) {
  res.json({ name: req.query.first + " " + req.query.last})
})


 module.exports = app;