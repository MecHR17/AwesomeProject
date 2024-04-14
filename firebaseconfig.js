import firebase from "firebase/compat/app"
import { initializeApp} from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyAN7IzZDe0XLfDuIZFHG8iG_dWXvvPmuyk',
  authDomain: 'nonogram-9ca92.firebaseapp.com',
  databaseURL: 'https://nonogram-9ca92-default-rtdb.firebaseio.com/',
  projectId: 'nonogram-9ca92',
  storageBucket: 'nonogram-9ca92.appspot.com',
  messagingSenderId: '662832630636',
  appId: '1:662832630636:android:cee2a1c3b1ba1d328bc149',
  measurementId: 'G-2E1KNBB1RR',
};

const app = (!firebase.apps.length)? initializeApp(firebaseConfig):firebase.app;
const database = getDatabase(app);

export default database;