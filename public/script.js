// all javascript for the front end 
const theVideoGrid = document.getElementById('the_video_grid')//we will put the videos in this variable
console.log(theVideoGrid);
const ownVideo = document.createElement('video');// made an element of the type video
ownVideo.muted = true;//muted our own video

let myVideoStream;
navigator.mediaDevices.getUserMedia({ //a promise used to access audio and video
    video: true,
    audio: true
  }).then(stream => {
    myVideoStream = stream;
    addingVideoStream(ownVideo, stream);
  })

const addingVideoStream=(video, stream) =>{ //adding it to stream
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    })
    theVideoGrid.append(video);
  }