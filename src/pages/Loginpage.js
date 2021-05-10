import React, { useState } from 'react';
import Loginimg from "../image/login.png"
import "../pages/Loginpage.css"
import { IoLogoTwitter } from "react-icons/io";
import Login from "./Login";
import SignIn from './SiginIn';
import { IoCodeSlashOutline } from 'react-icons/io5';

const Loginpage = (props) => {
    const [onMouse, setOnMouse] = useState(0);
    const [state, setState] = useState({
        signModalOpen: false,
        loginModalOpen: false,
    });

    const signOpenModal = () => {
        setState({ signModalOpen: true });
    }
    const signCloseModal = () => {
        setState({ signModalOpen: false });
    }

    const loginOpenModal = () => {
        setState({ loginModalOpen: true });
    }

    const loginCloseModal = () => {
        setState({ loginModalOpen: false });
    }

    window.localStorage.clear();

    return (
      <div className="Loginpage">
        <title>Kwitter</title>
        <div className="login-twitter-logo"> <IoLogoTwitter /> </div>
        <img className="login-background-img" src={Loginimg} />
        <div className="login-main-background">
            <div className="login-main">
                <IoLogoTwitter className="twitter-title-log"/>
                <div className="login-title">지금 일어나고 있는 일</div>
                <div className="login-subtitle">오늘 트위터에 가입하세요.</div>
                <button className="sign-btn"
                    onClick={() => signOpenModal()}
                >가입하기</button>
                <button className="login-btn"
                    onClick={() => loginOpenModal()}
                >로그인</button>

                <SignIn isOpen={state.signModalOpen} close={() => signCloseModal()} {...props} />
                <Login isOpen={state.loginModalOpen} close={() => loginCloseModal()} {...props} />
            </div>
        </div>
        <footer className="login-footer">© 2021 Kwitter</footer>
      </div>
    );
}

export default Loginpage
