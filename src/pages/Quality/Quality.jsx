import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import './Quality.css';

import {useNavigate } from 'react-router-dom';
import tool from '../../assets/Icon metro-tools.png'

import React from "react";

const Quality = () => {
    const navigate = useNavigate();

    const handleClick = () => {

        navigate('/PFMaster');
    };

    return(
        <>
            <div className="quality-container">
                <div className="home-icon-container">
                    <HomeRoundedIcon />
                </div>
                <h1 className="quality-content">Quality</h1>
            </div>
            <div className="card-container">
                <div className="left-card">
                    <p className="card-heading">SELECT</p>
                    <div>
                        <p className="card-buttons">MASTER DATA</p>
                    </div>
                </div>

                <div className="left-card">
                    <p className="card-heading">ACT</p>
                    <button className="card-buttons" onClick={handleClick}>PART FAMILY MASTER</button>
                    <button className="card-buttons">BARCODE PATTERN MASTER</button>
                </div>
                <div className="right-card">
                    <p className="card-heading">TOOLS</p>
                    <button className="card-buttons">MASTER DATA QUALITY
                        <img className="toolImg"  src= {tool} alt="toolimg"/>
                    </button>
                </div>
            </div>
        </>
    );
}
export default Quality;