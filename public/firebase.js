 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB9sVCvZ-1XXVwIa6IZ2ZENmTlDsFYPgos",
    authDomain: "rooms-join-to-connect.firebaseapp.com",
    projectId: "rooms-join-to-connect",
    storageBucket: "rooms-join-to-connect.appspot.com",
    messagingSenderId: "1076553875001",
    appId: "1:1076553875001:web:985e6c82fed3d87477d7e8",
    measurementId: "G-J00HJLP059"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

//auth utility variable for our firebase app
 const auth=firebase.auth();
 const db=firebase.firestore();