import React, { createRef, useState, } from "react";
import "./MainPage.css"
import Header from "../../components/header/Header.jsx"
import Map1 from "../../components/workArea/Map.js"
import Footer from "../../components/footer/Footer.jsx"

function MainPage() {
    return (
    <body>
     <Header/>
     <Map1/>
     <Footer/>
    </body>
    )
}

export default MainPage