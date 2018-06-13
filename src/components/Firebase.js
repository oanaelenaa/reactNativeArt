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
    static database;
    static registrationInfo={
        email:"nomail",
        isAutheticated:false,
        refreshToken:"",
        UID:"UyX1xi8HPKOtKktDLZXKyD2rzfu2",
    }

    static init(){
        firebase.initializeApp(config);
        Firebase.auth=firebase.auth();
        Firebase.database=firebase.database();
        Firebase.databaseRef=firebase.database().ref();
    }
    static getDatabaseRefUser(path)
    {
        return firebase.database().ref(path+this.registrationInfo.UID);
    }

    static getDatabaseRef(path)
    {
        return firebase.database().ref(path);
    }
}