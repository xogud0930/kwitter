import React, { useState, useEffect } from 'react';
import { IoPersonCircle  } from 'react-icons/io5';
import { RiImage2Line  } from 'react-icons/ri';
import { Button, Tooltip, Layout, Input } from 'antd';
import { db } from '../Firebase'
import './Homepage.css';
import 'antd/dist/antd.css';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

const { Header, Content } = Layout;
const { TextArea } = Input;

const Homepage = () => {
  const [text, setText] = useState("");
  const [onMouse, setOnMouse] = useState("");
  const [state, setState] = useState({
    isActive: false,
  })
  var tweetBtnState = false;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleOnClick = () => {
    if(state.isActive) {
      writeNewPost(0, "xogud0930", text, getTime())
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
              onMouseEnter={() => setOnMouse("tweet-img-btn")}
              onMouseLeave={() => setOnMouse(0)}
              style={{ backgroundColor: "tweet-img-btn" === onMouse ? "#1da0f227" : "white" }}
            ><RiImage2Line/></button>

            <button
              className="tweet-btn"
              onMouseEnter={() => setOnMouse("tweet-btn")}
              onMouseLeave={() => setOnMouse(0)}
              onClick={() => handleOnClick()}
              style={{ backgroundColor: state.isActive
                ? ("tweet-btn" === onMouse ? "#1985c9" : "#1da0f2")
                : "#1da0f26c" }}
            >Tweet</button>
          </div>
        </div>

        <br/>
        {Object.keys(contents).reverse().map((post, id) => (
          <div
            className="tweet-content-div"
            style={{backgroundColor: id+1 === onMouse ? "#ebebeb44" : "white"}}>
            <button
            className="tweet-content"
            onMouseEnter={() => setOnMouse(id+1)}
            onMouseLeave={() => setOnMouse(0)}
            > 
              <div className="tweet-wrap">
                <IoPersonCircle style={{fontSize: "3vw", marginRight:"5px", verticalAlign: "top"}}/>
                <div style={{display:"inline-table"}}>
                  <div className="tweet-name">{contents[post].author}</div>
                  <div className="tweet-time"> - {contents[post].time}</div>
                  <div className="tweet-body">{contents[post].body}</div>
                </div>
              </div>

            </button>
          </div>
        ))}

      </Content>
    </div>
  ); 
}

const writeNewPost = (uid, username, body, time) => {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    time: time,
  };

  // Get a key for a new Post.
  var newPostKey = db.ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;

  return db.ref().update(updates);
};

const getTime = () => {
  let today = new Date();
  let time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
    seconds: today.getSeconds(),
  };
  return(`${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}:${time.seconds}`)
}

export default Homepage
