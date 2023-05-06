import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGRoMVufAEWGYIuqz_oaIdGvwDQfonbeM",
  authDomain: "chat-app-5e121.firebaseapp.com",
  databaseURL: "https://chat-app-5e121-default-rtdb.firebaseio.com",
  projectId: "chat-app-5e121",
  storageBucket: "chat-app-5e121.appspot.com",
  messagingSenderId: "156324211362",
  appId: "1:156324211362:web:03adf4ef8aae915eb185fb",
  measurementId: "G-CNE10EECSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

