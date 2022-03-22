import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkDbUzjTMCOAem1Pn_YNcLdap4JlwbJvA",
  authDomain: "qviple-9758b.firebaseapp.com",
  databaseUrl: "http://qviple-9758b.firebaseapp.com",
  projectId: "qviple-9758b",
  storageBucket: "qviple-9758b.appspot.com",
  messagingSenderId: "930381344606",
  appId: "1:930381344606:web:9d8066c6b29c5d282829cf",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
