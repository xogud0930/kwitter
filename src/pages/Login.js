import React, { useEffect, useReducer, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { IoLogoTwitter } from "react-icons/io";

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
        userloginCheck();
    }

    const userloginCheck = () => {
        setAccount({...account, loginUid: ""});
        db.ref().child("userId").on('value', async (snapshot) => {
            setBtnCheck(true);
            if(snapshot.exists()) {
                var userIdList = await Object.entries(snapshot.val())
                userIdList.map((list) => {
                    if(list[0] === account.userId) {
                        setAccount({...account, idCheck: true, loginUid: list[1]});
                    }
                })
            }
        });
    }
    
    useEffect(() => {
        if(account.loginUid !== "") {
            db.ref().child("accounts").child(account.loginUid).on('value', async (snapshot) => {
                if(snapshot.exists()) {
                    var dbAccount = await snapshot.val();
                    account.idCheck = dbAccount.userId === account.userId ? true : false;
                    account.pwCheck = dbAccount.password === account.password ? true : false;
                    console.log(account.idCheck)
                    console.log(account.pwCheck)
                    if(account.idCheck & account.pwCheck) {
                        window.localStorage.setItem("userId", dbAccount.userId)
                        window.localStorage.setItem("email", dbAccount.email)
                        window.localStorage.setItem("uid", dbAccount.uid)
                        props.history.push("/main");
                    }
                }
            });
        }   
    }, [account.loginUid])

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
                                    : (btnCheck & !account.pwCheck & list.value === "password")
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