var express = require('express');
var app = express();
require('dotenv').config();

/** Start a Working Express Server */
/**app.get("/",function(request,respone){
  respone.send('Hello Express')
})*/

/** Serve an HTML File */
var html_path =  __dirname + "/views/index.html"
app.get("/",function(request,response){
  response.sendFile(html_path)
})


/** Serve Static Assets */
app.use('/public',express.static(__dirname + '/public'))


/** Serve JSON on a Specific Route */
/**app.get("/json",(request,response) => {
  respone.json({message: "Hello json"})
}) 



//** Use the .env File */
const mySecret = process.env['MESSAGE_STYLE']
var message = {'message': "Hello json"} 
app.get('/json',(request,response) => {
    var jsonResponse = {'message': "HELLO JSON" };
    if (mySecret === "uppercase") {
    jsonResponse.message = jsonResponse.message.toUpperCase();
  }
    response.json(jsonResponse);
})

 module.exports = app;