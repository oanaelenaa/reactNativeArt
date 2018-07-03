import * as  firebase from "firebase";

const config = {
    apiKey: "AIzaSyBaRCxKGMD51bUzGH--BDDBLr1QJKN3QjQ",
    authDomain: "whatsart1995.firebaseapp.com",
    databaseURL: "https://whatsart1995.firebaseio.com",
    projectId: "whatsart1995",
    storageBucket: "whatsart1995.appspot.com",
    messagingSenderId: "1058765189399"
};

export default class Firebase {

    static auth;
    static databaseRef;
    static database;
    static persistanceLevel;
    static storageRef;
    static registrationInfo = {
        email: "",
        name: "",
        isAutheticated: false,
        refreshToken: "",
        UID: "4cYcDsiVE6cbe0e7cfybhVWcZcn2",
    }

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.database = firebase.database();
        Firebase.databaseRef = firebase.database().ref();
        Firebase.persistanceLevel = firebase.auth.Auth.Persistence.LOCAL;
        Firebase.storageRef = firebase.storage();
    }
    static updateFirebaseService(val, name) {
        Firebase.registrationInfo.email = val.user.email;
        Firebase.registrationInfo.isAutheticated = true;
        Firebase.registrationInfo.refreshToken = val.user.refreshToken;
        Firebase.registrationInfo.UID = val.user.uid;
        Firebase.registrationInfo.name = name;
    }

    static getDatabaseRefUser(path) {
        return firebase.database().ref(path + this.registrationInfo.UID);
    }

    static getDatabaseRef(path) {
        return firebase.database().ref(path);
    }
}