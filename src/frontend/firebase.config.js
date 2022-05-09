import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKep-FAdWjkTDFiJh57dKE-D3giKGzJTA",
  authDomain: "quizit-6662c.firebaseapp.com",
  projectId: "quizit-6662c",
  storageBucket: "quizit-6662c.appspot.com",
  messagingSenderId: "653278080445",
  appId: "1:653278080445:web:d085a324d705b8042936d4",
  measurementId: "G-V96MN4J0BZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
