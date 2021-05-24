import React, { useEffect, useReducer, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { IoLogoTwitter } from "react-icons/io";
import axios from 'axios';

import "./Login.css"
import { db } from '../Firebase'

const inputList = [
    { id:0, name: "아이디", value: "userId" },
    { id:1, name: "패스워드", value: "password" },

]

const Login = (props) => {
    const { isOpen, close } = props;
    const [ btnCheck, setBtnCheck ] = useState(false);
    const [ account, setAccount ] = useState({
        userId: "",
        password: "",
        idCheck: false,
        pwCheck: false,
        loginUid : "",
    })

    const handleChange = (e) => {
        setBtnCheck(false);
        const { value, name } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            loginAccount();
        }
    }

    const onReset = () => {
        setAccount({
            userId: "",
            password: "",
            idCheck: false,
            pwCheck: false,
            loginUid : "",
        })
        setBtnCheck(false);
        close();
    }

    const loginAccount = () => {

        axios.post(
        '/api/login',account)
        .then(res => {
            setBtnCheck(true);
            setAccount({...account, idCheck: res.data.idCheck, pwCheck: res.data.pwCheck})
            console.log(res);
            if(res.data.success) {
                if(res.data.idCheck & res.data.pwCheck) {
                    window.localStorage.setItem("userId", account.userId)
                    window.localStorage.setItem("email", account.email)
                    props.history.push("/main");
                }
            }
        })  
        .catch(error => {
            console.log(error)
        });
    };

    return (
        <>
            { isOpen ?
                (
                    <div className="modal" onClick={() => onReset()}>
                        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="twitter-logo"> <IoLogoTwitter style={{marginBottom:"20px"}}/> </div>
                            <div className="login-input">
                                {inputList.map((list) => (
                                    <>
                                    <div>{list.name}</div>
                                    <input
                                        type={list.value === "password" ? "password" : ""}
                                        name={list.value}
                                        value={account[list.value]}
                                        onChange={handleChange}
                                        placeholder={list.name}
                                        onKeyPress={(e) => onKeyPress(e)}
                                    />

                                    {(btnCheck & account[list.value] === "")
                                    ? <span>입력해주세요.</span>
                                    : (btnCheck & !account.pwCheck & account.idCheck & list.value === "password")
                                    ? <span>비밀번호가 일치하지 않습니다.</span>
                                    : ((btnCheck & !account.idCheck & list.value === "userId")
                                    ? <span>등록되지 않은 아이디입니다.</span>
                                    : <span>&nbsp;</span>)}
                                    </>
                                ))}
                                <button
                                    onClick={() => loginAccount()}
                                >로그인</button>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default Login