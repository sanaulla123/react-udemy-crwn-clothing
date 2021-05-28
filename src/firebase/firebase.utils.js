import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAZGx2pZuykFlwalnJ2dUvyYmP5qOOZFCQ",
    authDomain: "crwn-db-f4f77.firebaseapp.com",
    projectId: "crwn-db-f4f77",
    storageBucket: "crwn-db-f4f77.appspot.com",
    messagingSenderId: "373007093258",
    appId: "1:373007093258:web:13c5b1952fd0820d2ed9f3",
    measurementId: "G-R9QEZB4WDE"
  };

  export const createUserProfileDocument = 
    async (userAuth, additionalData) => {
      if ( !userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      console.log(snapShot);
      if (!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
              displayName,
              email, createdAt,
              ...additionalData
            });
        } catch (error){
          console.log('error creatng user', error.message);
        }
      }

      return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle =  () => auth.signInWithPopup(provider);

  export default firebase;