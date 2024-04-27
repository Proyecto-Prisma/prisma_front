import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDMqn9X38QQQ_FQLEVsKd3XCMDfDaNGVnc",
    authDomain: "prisma-58a39.firebaseapp.com",
    databaseURL: "https://prisma-58a39-default-rtdb.firebaseio.com",
    projectId: "prisma-58a39",
    storageBucket: "prisma-58a39.appspot.com",
    messagingSenderId: "532575758086",
    appId: "1:532575758086:web:76b7e4ef12cc5252736087",
    measurementId: "G-T0LYHFX9WH"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  export { app, database };