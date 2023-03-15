// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider,createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARrXN3GP7_LeZk6k3bQZMQZ_qE0pGo5C8",
  authDomain: "crwn-clothing-db-b9f3b.firebaseapp.com",
  projectId: "crwn-clothing-db-b9f3b",
  storageBucket: "crwn-clothing-db-b9f3b.appspot.com",
  messagingSenderId: "233827467898",
  appId: "1:233827467898:web:bf3f0d2197dfe3ba9531c3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); 
//class we get from firebase authentication, so new keyword is used.There are many providers like github. So it depemds ont he provider we are using. Hence instance is created.

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); //authentication will be the same 

export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();



//when using google popup signin , we get the display name, email. so we set the userdoc to these variables. 
//but when using email password sigin, we dont get the display name. so we are adding argument "additionalInformation" in case
// we dont get the display name.
export const createUserDocumentFromAuth = async(userAuth,additionalInformation={displayName :'mike'}) =>{
    const userDocRef = doc(db, 'users' , userAuth.uid);
    console.log("userDoc",userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log("usersnapshot",userSnapshot.exists());


    //if user data not exists

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        //we are going to try to set the document
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch(error){
            console.log('error creating the user',error.message);
        }
    }

    //if user exists :
    return userDocRef;


}

//sign up functionality

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
if(!email || !password) return;

return await createUserWithEmailAndPassword(auth,email,password);
}