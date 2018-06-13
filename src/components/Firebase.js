import * as  firebase from "firebase";

const config = {
    apiKey: "AIzaSyBaRCxKGMD51bUzGH--BDDBLr1QJKN3QjQ",
    authDomain: "whatsart1995.firebaseapp.com",
    databaseURL: "https://whatsart1995.firebaseio.com",
    projectId: "whatsart1995",
    storageBucket: "whatsart1995.appspot.com",
    messagingSenderId: "1058765189399"
  };

export default class Firebase{

    static auth;
    static databaseRef;
    static registrationInfo={
        email:"nomail",
        isAutheticated:false,
        refreshToken:"",
        UID:0,
    }

    static init(){
        firebase.initializeApp(config);
        Firebase.auth=firebase.auth();
        Firebase.databaseRef=firebase.database().ref();
    }
}