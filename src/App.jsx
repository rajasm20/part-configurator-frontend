import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Quality from "./pages/Quality/Quality.jsx";
import {Route, Routes} from 'react-router-dom';
import PFMaster from "./pages/PartFamilyMaster/PFMaster.jsx";

export const App = () => {
    return(
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Quality />} />
                <Route path='/PFMaster' element={<PFMaster />} />
            </Routes>
            <Footer />
        </>

    )

}

export default App;
