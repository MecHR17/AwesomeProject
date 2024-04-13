import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAN7IzZDe0XLfDuIZFHG8iG_dWXvvPmuyk',
  authDomain: 'nonogram-9ca92.firebaseapp.com',
  databaseURL: 'https://nonogram-9ca92.firebaseio.com',
  projectId: 'nonogram-9ca92',
  storageBucket: 'nonogram-9ca92.appspot.com',
  messagingSenderId: '662832630636',
  appId: '1:662832630636:android:cee2a1c3b1ba1d328bc149',
  measurementId: 'G-2E1KNBB1RR',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
