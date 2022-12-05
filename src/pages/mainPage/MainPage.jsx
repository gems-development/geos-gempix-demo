import React, { createRef, useState, } from "react";
import "./MainPage.css"
import Header from "../../components/header/Header.jsx"
import Map1 from "../../components/workArea/Map.js"
import Footer from "../../components/footer/Footer.jsx"
import Info from "../../components/ui/Info/Info"

function MainPage() {
    return (
    <body>
     <Header/>
     <Map1/>
     <Info/>
     <Footer/>
    </body>
    )
}

export default MainPage