import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Radio } from 'antd';
import { RiHome7Fill, RiFileList2Line } from "react-icons/ri";
import { BiSearchAlt2, BiEnvelope, BiBookmark, BiDotsHorizontalRounded } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { IoLogoTwitter } from "react-icons/io";
import { IoPersonCircle  } from "react-icons/io5";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './NavBar.css';

const lists = [
    { id: 1, title: "", icon: <IoLogoTwitter style={{color: "#1da0f2"}}/> , link: "/home"},
    { id: 2, title: " Home", icon: <RiHome7Fill/> , link: "/home"},
    { id: 3, title: " Explore", icon: <BiSearchAlt2/>, link: "/explore"},
    { id: 4, title: " Notifications", icon: <FiBell/>, link: "/notifications"},
    { id: 5, title: " Messages", icon: <BiEnvelope/>, link: "/messages"},
    { id: 6, title: " Bookmark", icon: <BiBookmark/>, link: "/bookmark"},
    { id: 7, title: " List", icon: <RiFileList2Line/>, link: "/list"},
    { id: 8, title: " Profile", icon: <BsFillPersonFill/>, link: "/profile"},
];

const NavBar = (props) => {
    const userData = {
        userId: window.localStorage.getItem("userId"),
        email: window.localStorage.getItem("email"),
    };

    const logout = () => {
        props.history.push("/")
    }

    return (
        <nav className="navbar-menu">
        {lists.map((list) => (
            <button
                className="btn"
                key={list.id}
            >
                <Link to={"/main" + list.link}>
                    <div className="navbar">
                        {list.icon}
                        {list.title}  
                    </div>
                </Link>
            </button>
        ))}          
        <button
            className="btn"
        >
            <div className="navbar"><CgMoreO/> More</div>
        </button>

        <button
            className="btn-tweet"
        >
            Tweet
        </button>
        
        <button
            className="btn-profile"
            onClick={() => logout()}
        >
            <IoPersonCircle style={{fontSize:"3vw", verticalAlign: "middle"}}/>
            <div className="btn-profile-name">
                <div style={{fontWeight: "bold"}}>{userData.userId}</div>
                <div style={{color: "grey"}}>{userData.email}</div>
            </div>
            <BiDotsHorizontalRounded style={{fontSize:"1.3vw", verticalAlign: "middle"}}/>
        </button>

        </nav>
    );
}

export default NavBar;