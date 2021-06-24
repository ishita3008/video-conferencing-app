//setting up the server

const express = require('express');// create an express server
const app = express(); //runs the express function


const{v4: uuidV4}=require('uuid');//importing v4 version of uuid
 //uuid would generate random ids for the rooms

 
const server = require('http').Server(app); //setting up express server to be used with further libraries
const io = require('socket.io')(server);//importing socket.io


/*const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})*/


const { ExpressPeerServer } = require('peer');//imported peer
const peerServer = ExpressPeerServer(server, {
  debug: true
});


app.use('/peerjs', peerServer);//specific peer which url we are using


app.set('view engine', 'ejs');//our view engine is going to be ejs
app.use(express.static('public')); //static folder in public url


app.get('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`) //redirect to a page with a new gennerated id
})


app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room }) //passed id to the front end
  })


io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
       // console.log("joined room");
       socket.join(roomId);//joined the room on that specific id
        socket.to(roomId).emit('user-connected', userId);//telling everyone that a user has been connected
    })
    }); 

server.listen(3010); //server will be a local host andd the port will be 3000 

