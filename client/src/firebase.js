// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiHJqV4Up-cTV818u2ukmr5EBvdwKbh10",
  authDomain: "library-814ef.firebaseapp.com",
  projectId: "library-814ef",
  storageBucket: "library-814ef.appspot.com",
  messagingSenderId: "742168970732",
  appId: "1:742168970732:web:3ab019d5d9e6429e722cc9",
  measurementId: "G-CS8CMS8CC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const createToken = async () => {
  const user = getAuth(app).currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
    headers1: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  return payloadHeader;
};

export { auth };
