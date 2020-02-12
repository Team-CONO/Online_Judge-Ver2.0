import * as firebase from 'firebase'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCIS_1NvP-je1tyBz6WiD98Uy8OKJm-0kc",
    authDomain: "mimi-chan.firebaseapp.com",
    databaseURL: "https://mimi-chan.firebaseio.com",
    projectId: "mimi-chan",
    storageBucket: "mimi-chan.appspot.com",
    messagingSenderId: "1048067516151",
    appId: "1:1048067516151:web:70d762a4b4a505db0195f2"
  };

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
}

export default firebase