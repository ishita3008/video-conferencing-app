// all javascript for the front end 
const socket = io('/')//importing socket.io
const theVideoGrid = document.getElementById('the_video_grid')//we will put the videos in this variable
console.log(theVideoGrid);
const ownVideo = document.createElement('video');// made an element of the type video

ownVideo.muted = true;//muted our own video


const user = prompt("Enter your name");//creating a prompt

const thePeer = new Peer (undefined);
//,{
 // path: '/peerjs',
 // host: '/',
  //port: '443'

//}); //created a new peer

const peers={};//to keep a track of who joined the call
let myOwnVideoStream;
navigator.mediaDevices.getUserMedia({ //a promise used to access audio and video
    video: true,
    audio: true
  }).then(stream => {
    myOwnVideoStream = stream;
    addingVideoStream(ownVideo, stream);

    //ans the call
thePeer.on('call', call => {
      call.answer(stream)//answered the new peer's call
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addingVideoStream(video, userVideoStream)
      })
    })
  

    socket.on('user-is-connected',userId => {
      connectToAnotherNewUser(userId, stream);
    })
  })

 /*socket.on('user-is-disconnected', userId =>{
 if(peers[userId]) peer[userId].close();//only do this when some person is there in the room
 }) */

thePeer.on('open', id =>{
  socket.emit('joining-the-room', ID_OF_ROOM, id, user);
 }) //we can join the room with that specific room id

  

  const connectToAnotherNewUser = (userId, stream) =>{ //send that new user our video
 //console.log(userId);
    //we will use peer to connect to our user
 const call = thePeer.call(userId, stream)//called our new peer and send our own stream
 const video = document.createElement('video')
 call.on('stream', userVideoStream => {
   addingVideoStream(video, userVideoStream)
 })
 call.on('close',()=>{
   video.remove()
   
 })
  
//peers[userId]=call;//every user id is linked to the call
}

 
  const addingVideoStream=(video, stream) =>{ //adding it to stream
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    })
    theVideoGrid.append(video)
  }

let messages = document.querySelector(".messages");
let messageText = $("input");
 
  $('html').keydown( a=> {
    if (a.which == 13 && messageText.val().length !== 0) {// when enter is pressed, send the message
      //console.log(messageText.val());
      socket.emit('message', messageText.val());//sending from the front end
      messageText.val('')//clear the input
    }
  });

//show message in chat using jquery
 socket.on("create-a-Message", (message, userName) => {
 //console.log(userName);
  messages.innerHTML =
  messages.innerHTML +
  `<div class="messages">
      <b><i class="far fa-user-circle"></i> <span> ${
        userName === user ? "me" : userName 
      }</span> </b>
      <span>${message}</span>
  </div>`;
   scrolling()
  })

  const scrolling =()=>{
    let m= $('.main__chat_rectangle');
    m.scrollTop(m.prop("scrollHeight"));
  }

//mute video
  const mutingUnmuting = () => {
    const enabled = myOwnVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myOwnVideoStream.getAudioTracks()[0].enabled = false;//if theres an audio switch it off
     unmute();//change icon
    } else {
      mute();//change icon
      myOwnVideoStream.getAudioTracks()[0].enabled = true;//if theres not an audio switch it on
    }
  }

  const mute = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const unmute = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }

  const videoStop = () => {
    
    let enabled = myOwnVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myOwnVideoStream.getVideoTracks()[0].enabled = false;//if theres a video switch it off
    videoOn()//change icon
    } else {
      videoOff()//change icon
      myOwnVideoStream.getVideoTracks()[0].enabled = true;//if theres not a video switch it on
    }
  }

  const videoOff = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const videoOn = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }

  const inviteButton = document.querySelector("#inviteButton");
  inviteButton.addEventListener("click", (e) => {
    prompt(
      "Copy this link and send it to people you want to meet with",
      window.location.href
    );
  });

  
