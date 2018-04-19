import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAfv_G42KQ43aF_bjC_8zZTCkO5ZzqJXIk",
    authDomain: "project4-d9523.firebaseapp.com",
    databaseURL: "https://project4-d9523.firebaseio.com",
    projectId: "project4-d9523",
    storageBucket: "",
    messagingSenderId: "1097251657524"
 };

 export const firebaseApp = firebase.initializeApp(config);
 export const questionsDb = firebase.database().ref('questions');
 export const commentsDb = firebase.database().ref('comments');

