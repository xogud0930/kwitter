import React, { useState, useEffect } from 'react';
import { IoPersonCircle  } from 'react-icons/io5';
import { RiImage2Line, RiDeleteBinLine  } from 'react-icons/ri';
import { Button, Tooltip, Layout, Input, Empty } from 'antd';
import { db } from '../Firebase'
import './Homepage.css';
import 'antd/dist/antd.css';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

const { Header, Content } = Layout;
const { TextArea } = Input;

const Homepage = () => {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    isActive: false,
  })
  var tweetBtnState = false;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleOnClick = () => {
    if(state.isActive) {
      writeNewPost(text, getTime())
      setText("")
      setState({ isActive:false })
    }
  }

  const checkEmpty = () => {
    text === "" ? setState({ isActive:false }) : setState({ isActive:true })
  }

  const [contents, setContents] = useState("");

  const getPosts = () => {
    db.ref().child("posts").on('value', (snapshot) => {
      if(snapshot.exists()) {
        setContents(Object.values(snapshot.val()))
      } else {
        setContents("")
      }
    });
  }

  const delPost = (post) => {
    db.ref().child("posts").child(post.uid).remove();
    console.log(post.uid);
  }

  useEffect(() => {
    getPosts();
    if(text === "") tweetBtnState = false;
    else tweetBtnState = true;
  }, []);


  return (
    <div>
      <title>Home / Kwitter</title>

      <Header className="header">
        Home
      </Header>

      <Content className="content">
        <div className="home-tweet">
          <IoPersonCircle style={{fontSize:"3.5vw", verticalAlign: "top"}}/>
          <div style={{display: "inline-block"}}>
            <div className="tweet-input">
              <TextArea
                className="input-text"
                value={text}
                onKeyUp={checkEmpty}
                onChange={handleChange}
                placeholder="What's happening?"
                bordered={false}
                autoSize={{ minRows: 1, maxRows: 5 }}
              />
            </div>
            <button
              className="tweet-img-btn"
            ><RiImage2Line/></button>

            <button
              className= {state.isActive ? "tweet-btn" : "tweet-btn-disabled"}
              onClick={() => handleOnClick()}
            >Tweet</button>
          </div>
        </div>

        {contents !== ""
          ? (Object.keys(contents).reverse().map((post, id) => (
          <div className="tweet-content-div">
            <button className="tweet-content"> 
              <div className="tweet-wrap">
                <IoPersonCircle style={{fontSize: "3vw", marginRight:"5px", verticalAlign: "top"}}/>
                <div style={{display:"inline-table"}}>
                  <div className="tweet-name">{contents[post].author}</div>
                  <div className="tweet-time"> - {contents[post].time}</div>
                  <button
                    className="del-btn"
                    onClick={() => delPost(contents[post])}
                  ><RiDeleteBinLine/></button>
                  <div className="tweet-body">{contents[post].body}</div>
                </div>
              </div>

            </button>
          </div>  
        )))
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{marginTop:"20vh"}} />}

      </Content>
    </div>
  ); 
}

const writeNewPost = (body, time) => {
  var postData = {
    author: window.localStorage.getItem("userId"),
    uid: window.localStorage.getItem("userId"),
    body: body,
    time: time,
  };

  var newPostKey = db.ref().child('posts').push().key;
  postData.uid = newPostKey;

  var updates = {};
  updates['/posts/' + newPostKey] = postData;

  return db.ref().update(updates);
};

const getTime = () => {
  let today = new Date();

  const addZero = (n) => {
    return n >= 10 ? n : '0' + n;
  }

  let time = {
    year: today.getFullYear(),
    month: addZero(today.getMonth()),
    date: addZero(today.getDate()),
    hours: addZero(today.getHours()),
    minutes: addZero(today.getMinutes()),
    seconds: addZero(today.getSeconds()),
  };

  return(`${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}:${time.seconds}`)
}

export default Homepage
