//setting up the server

const express = require('express');// create an express server
const app = express(); //runs the express function
const{v4: uuidV4}=require('uuid');//importing v4 version of uuid
 //uuid would generate random ids for the rooms

const server = require('http').Server(app); //setting up express server to be used with further libraries

app.set('view engine', 'ejs');//our view engine is going to be ejs

app.get('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`) //redirect to a page with a new gennerated id
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room }) //passed id to the front end
  })

server.listen(3010); //server will be a local host andd the port will be 3000 

