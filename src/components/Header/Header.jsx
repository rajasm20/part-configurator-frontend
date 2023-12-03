import React from "react";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import CircleNotificationsSharpIcon from '@mui/icons-material/CircleNotificationsSharp'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import tatalogo from '../../assets/tatalogo.png'
import imps from '../../assets/imps.png'
import './Header.css'

const Navbar = () => {
    return(
        <>
            <nav className="main-nav">
                <div className="left-nav">
                    <img className="tatalogo"  src= {tatalogo} alt="tata"/>
                </div>
                <div className="right-nav">
                    <div className="icons-nav">
                    <WarningAmberOutlinedIcon className="iconS" />
                    <CircleNotificationsSharpIcon className="iconS" />
                    <AccountCircleSharpIcon  className="accountIcon" />
                    <ArrowDropDownSharpIcon className="downIcon" />
                     </div>
                     <div className="imps-nav">
                           <img className="imps" src={imps} alt="imps"/>
                      </div>
                  </div>
            </nav>
        </>
    );
};

export default Navbar;