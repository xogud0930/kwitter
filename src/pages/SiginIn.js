import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLogoTwitter } from "react-icons/io";
import "./SignIn.css"
import { db } from '../Firebase'

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
    const [ state, setState ] = useState({
        userIdCheck: false,
    })
    const [ btnCheck, setBtnCheck ] = useState(false);
    const [ pwCheck, setPwCheck ] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        if(name === "userId") setState({ userIdCheck: false });
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
        });
        setState({
            userIdCheck: false,
        });
        setBtnCheck(false);
        props.history.push("/");
        close();
    }

    const regAccount = () => {
        var checkEmpty = true;
        var accountData = {...account};

        setBtnCheck(true);
        
        Object.values(accountData).map((acc) => {
            if(acc === "") {
                checkEmpty = false;
            }
        });

        if(account.password === account.passwordCheck) {
            setPwCheck(true);
        }

        AccountCheck()

        if(!state.userIdCheck & ( checkEmpty & pwCheck )) {
            var newAccKey = db.ref().child('accounts').push().key;
            accountData.uid = newAccKey;

            var updates = {};

            updates['/userId/' + accountData.userId] = newAccKey;
            db.ref().update(updates);

            updates['/accounts/' + newAccKey] = accountData;
            db.ref().update(updates);

            onReset();
        }
    };

    const AccountCheck = () => {
        var dupeCheck = false;

        db.ref().child("userId").on('value', (snapshot) => {

            if(snapshot.exists()) {
                var userIdList = Object.keys(snapshot.val())
                userIdList.map((id) => {
                    if(id === account.userId) dupeCheck = true;
                    setState({ userIdCheck: dupeCheck });
                    return dupeCheck;
                })
                
            }
        });
    }

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
                            {(state.userIdCheck & list.value === "userId")
                            ? <span>중복된 아이디 입니다.</span>
                            : (btnCheck & !pwCheck & (list.value === "password" | list.value === "passwordCheck"))
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