import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLogoTwitter } from "react-icons/io";
import "./SignIn.css"
import { db } from '../Firebase'
import axios from 'axios';

const inputList = [
    { id:0, name: "이름", value: "name" },
    { id:1, name: "이메일", value: "email" },
    { id:2, name: "사용자 아이디", value: "userId" },
    { id:3, name: "비밀번호", value: "password" },
    { id:4, name: "비밀번호 확인", value: "passwordCheck" },
]

const SignIn = (props) => {
    const { isOpen, close } = props;
    const [ account, setAccount ] = useState({
        name: "",
        email: "",
        userId: "",
        password: "",
        passwordCheck: "",
    })
    const [ userIdCheck, setUserIdCheck ] = useState(false);
    const [ btnCheck, setBtnCheck ] = useState(false);
    const [ pwCheck, setPwCheck ] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        if(name === "userId") setUserIdCheck(false);
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const onReset = () => {
        setAccount({
            name: "",
            email: "",
            userId: "",
            password: "",
            passwordCheck: "",
        });
        setUserIdCheck(false);
        setBtnCheck(false);
        setPwCheck(false);
        props.history.push("/");
        close();
    };

    const regAccount = () => {
        setBtnCheck(true);
        axios.post(
        '/api/register',account)
        .then(res => {
            console.log(res);
            setUserIdCheck(!res.data.idCheck);
            setPwCheck(res.data.pwCheck);
            console.log(`Name : ${res.data.nameCheck}\nEmail : ${res.data.emailCheck}\nID : ${res.data.idCheck}\nPW : ${res.data.pwCheck}`);
            if(res.data.success) onReset();
        })  
        .catch(error => {
            console.log(error)
        });
    };

    return(
        <>
            { isOpen ? (
            <div className="modal" onClick={() => onReset()}>
                <div className="sign-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="twitter-logo"> <IoLogoTwitter /> </div>
                    <div className="sign-input">
                        {inputList.map((list) => (
                            <>
                            <div>{list.name}</div>
                            <input
                                type={(list.value === "password" | list.value === "passwordCheck") ? "password" : ""}
                                name={list.value}
                                value={account[list.value]}
                                onChange={handleChange}
                                placeholder={list.name}
                            />
                            {(userIdCheck & list.value === "userId")
                            ? <span>중복된 아이디 입니다.</span>
                            : (btnCheck & !pwCheck & list.value === "passwordCheck" & account.password !== "")
                            ? <span>비밀번호가 일치하지 않습니다.</span>
                            : ((btnCheck & account[list.value] === "")
                            ? <span>입력해주세요.</span>
                            : <span>&nbsp;</span>)}
                            </>
                        ))}
                        <button
                            onClick={() => regAccount()}
                        >가입하기</button>
                    </div>
                </div>
            </div>
            ) : null}
        </>
    )
}

export default SignIn