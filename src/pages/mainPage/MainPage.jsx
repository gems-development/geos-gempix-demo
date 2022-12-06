import React, { createRef, useState, } from "react";
import "./MainPage.css"
import Header from "../../components/header/Header.jsx"
import Map1 from "../../components/workArea/Map.js"
import Footer from "../../components/footer/Footer.jsx"
import Info from "../../components/ui/Info/Info"
import {clearTempObjects} from '../../components/workArea/Map.js';

function MainPage() {
    return (
    <body onClick = {clearTempObjects}>
     <Header/>
     <Map1/>
    
     <Footer/>
    </body>
    )
}

export default MainPage