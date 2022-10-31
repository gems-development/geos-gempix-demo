import './App.css';
import MainPage from "./pages/mainPage/MainPage.jsx"
import axios from 'axios';
import {useEffect } from 'react';


function App() {
  useEffect(() => {
    axios.get('http://localhost:5148/WeatherForecast').then(response => {
        const data = response.data;
    },
    reject => {
        console.log(reject);
    });
}, []);
  return(
    <MainPage />
  )
}

export default App;
