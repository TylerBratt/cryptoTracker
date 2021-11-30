import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCFJTaO87DTcqkycK5_WXuhuJyrzZOFSWs",
  authDomain: "cryptocurrency-cointracker.firebaseapp.com",
  projectId: "cryptocurrency-cointracker",
  storageBucket: "cryptocurrency-cointracker.appspot.com",
  messagingSenderId: "235087434211",
  appId: "1:235087434211:web:0174ad892ce253ea90d0d6",
  measurementId: "G-6JCDHYHYQN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;