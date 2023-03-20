import React, { useContext, useState } from "react";
import { ReactComponent as CloseMenu } from "../assets/logo.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "../Style/navbar.css";
import { authContext } from '../context/Context.auth'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'



const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
    const cookies = new Cookies();

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    const handleLogout = () => {
        cookies.remove('token', { path: '/' });

        setIsLoggedIn(false);
        navigate("/login");
       
    }
    const closeMobileMenu = () => setClick(false);
    return (
        <div className="header">
            <div className="logo-nav">
                <div className="logo-container">
                    <Link to="/home">
                        <Logo className="logo" />
                    </Link>
                </div>
                <ul className={click ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link style={{ color: "#fff", textDecoration: "none" }} to="/home">Home</Link>
                    </li>
                    <li className="option mobile-option" onClick={closeMobileMenu}>

                        <button onClick={handleLogout}>Logout</button>

                    </li>
                </ul>
            </div>
            <div className="mobile-menu" onClick={handleClick}>
                {click ? (
                    <CloseMenu className="menu-icon" />
                ) : (
                    <MenuIcon className="menu-icon" />
                )}
            </div>
            <ul className="signin-up">
                <li className="sign-in" onClick={closeMobileMenu}>
                    <Link to="#">
                        <img
                            src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
                            alt="img"
                            style={{ width: "50px", borderRadius: "50%", backgroundColor: 'lightcoral' }}
                        />
                    </Link>
                </li>
                <li onClick={closeMobileMenu}>
                    {/* <Link to="" > */}
                        <button className="signup-btn" onClick={handleLogout}>Logout</button>
                    {/* </Link> */}
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
