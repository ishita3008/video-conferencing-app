//setting up the server
//..
const express = require('express')// create an express server
const app = express() //runs the express function

const server = require('http').Server(app) //setting up express server to be used with further libraries
app.get('/',(req,res)=>{
    res.status(200).send('HELLO');
})
server.listen(3000) //server will be a local host andd the port will be 3000 