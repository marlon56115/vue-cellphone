import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDcqx5OhSrFhPp1yt2c6-kG0sYlIi2Tm6M",
    authDomain: "ebay-cellphone.firebaseapp.com",
    databaseURL: "https://ebay-cellphone.firebaseio.com",
    projectId: "ebay-cellphone",
    storageBucket: "ebay-cellphone.appspot.com",
    messagingSenderId: "178837515425",
    appId: "1:178837515425:web:3c4e3c33edcaae9a1e54e0"
  };
  // Initialize Firebase
  const app =firebase.initializeApp(firebaseConfig);
  const storage = app.storage();
  const db = app.firestore();
  export{storage,db};