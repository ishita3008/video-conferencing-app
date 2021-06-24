
// all javascript for the front end 
const socket = io('/')//importing socket.io
const theVideoGrid = document.getElementById('the_video_grid')//we will put the videos in this variable
console.log(theVideoGrid);
const ownVideo = document.createElement('video');// made an element of the type video
ownVideo.muted = true;//muted our own video


const peer = new Peer (undefined); //created a new peer


let myOwnVideoStream;
navigator.mediaDevices.getUserMedia({ //a promise used to access audio and video
    video: true,
    audio: true
  }).then(stream => {
    myOwnVideoStream = stream;
    addingVideoStream(ownVideo, stream);

    //ans the call
peer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addingVideoStream(video, userVideoStream)
      })
    })
  

    socket.on('user-connected',userId => {
      connectToAnotherNewUser(userId, stream);
    })
  })

  

peer.on('open', id =>{
  socket.emit('join-room', ID_OF_ROOM, id);
 }) //we can join the room with that specific room id

  

  const connectToAnotherNewUser = (userId, stream) =>{ //send that new user our video
 console.log(userId);
    //we will use peer to connect to our user
 const call = peer.call(userId, stream)//called our new peer and send our own stream
 const video = document.createElement('video')
 call.on('stream', userVideoStream => {
   addingVideoStream(video, userVideoStream)
 })
 
  }

 
  

  const addingVideoStream=(video, stream) =>{ //adding it to stream
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    })
    theVideoGrid.append(video)
  }