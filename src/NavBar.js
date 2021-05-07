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

const NavBar = () => {
    const [onMouse, setOnMouse] = useState(0);
    const [selected, setSelected] = useState(0);

    const handleColor = (row) => {
        setOnMouse(row.id);
    };

    const handleClick = (row) => {
        setSelected(row.id);
    };

    return (
        <nav className="navbar-menu">
        {lists.map((list) => (
            <button
                className="btn"
                key={list.id}
                onClick={() => handleClick(list)}
                onMouseEnter={() => handleColor(list)}
                onMouseLeave={() => setOnMouse(0)}
                style={{ backgroundColor: list.id === onMouse ? "#1da0f227" : "white" }}
            >
                <Link to={list.link}>
                    <div
                        className="navbar"
                        style={{color: (list.id === selected | list.id === onMouse) ? "#1da0f2" : "black"}}
                    >
                        {list.icon}
                        {list.title}  
                    </div>
                </Link>
            </button>
        ))}          
        <button
            className="btn"
            onClick={() => handleClick({id:9})}
            onMouseEnter={() => handleColor({id:9})}
            onMouseLeave={() => setOnMouse(0)}
            style={{ backgroundColor: 9 === onMouse ? "#1da0f227" : "white" }}
        >
            <div
                className="navbar"
                style={{color: (9 === selected | 9 === onMouse) ? "#1da0f2" : "black"}}
            ><CgMoreO/> More</div>
        </button>

        <button
            className="btn-tweet"
            onMouseEnter={() => handleColor({id:10})}
            onMouseLeave={() => setOnMouse(0)}
            style={{ backgroundColor: 10 === onMouse ? "#1985c9" : "#1da0f2" }}
        >
            Tweet
        </button>

        <button
            className="btn-profile"
            onMouseEnter={() => handleColor({id:11})}
            onMouseLeave={() => setOnMouse(0)}
            style={{ backgroundColor: 11 === onMouse ? "#1da0f227" : "white" }}
        >
            <IoPersonCircle style={{fontSize:"3vw", verticalAlign: "middle"}}/>
            <div className="btn-profile-name">
                <div style={{fontWeight: "bold"}}>Test</div>
                <div style={{color: "grey"}}>@abcdefghij</div>
            </div>
            <BiDotsHorizontalRounded style={{fontSize:"1.3vw", verticalAlign: "middle"}}/>
        </button>
        </nav>
    );
}

export default NavBar;