import React, { useState, useEffect } from 'react';
import { IoPersonCircle  } from 'react-icons/io5';
import { RiImage2Line, RiDeleteBinLine  } from 'react-icons/ri';
import { Button, Tooltip, Layout, Input } from 'antd';
import { db } from '../Firebase'
import './Homepage.css';
import 'antd/dist/antd.css';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

const { Header, Content } = Layout;
const { TextArea } = Input;

const Homepage = () => {
  const [text, setText] = useState("");
  const [onMouse, setOnMouse] = useState({
    tweet:0,
    del:0,
  });
  const [state, setState] = useState({
    isActive: false,
  })
  var tweetBtnState = false;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleOnClick = () => {
    if(state.isActive) {
      writeNewPost("xogud0930", text, getTime())
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
              onMouseEnter={() => setOnMouse({tweet:"tweet-img-btn"})}
              onMouseLeave={() => setOnMouse({tweet:0})}
              style={{ backgroundColor: "tweet-img-btn" === onMouse.tweet ? "#1da0f227" : "white" }}
            ><RiImage2Line/></button>

            <button
              className="tweet-btn"
              onMouseEnter={() => setOnMouse({tweet:"tweet-btn"})}
              onMouseLeave={() => setOnMouse({tweet:0})}
              onClick={() => handleOnClick()}
              style={{ backgroundColor: state.isActive
                ? ("tweet-btn" === onMouse.tweet ? "#1985c9" : "#1da0f2")
                : "#1da0f26c" }}
            >Tweet</button>
          </div>
        </div>
        {Object.keys(contents).reverse().map((post, id) => (
          <div
            className="tweet-content-div"
            style={{backgroundColor: id+1 === onMouse.tweet ? "#ebebeb44" : "white"}}>
            <button
            className="tweet-content"
            onMouseEnter={() => setOnMouse({tweet:id+1})}
            onMouseLeave={() => setOnMouse({tweet:0})}
            > 
              <div className="tweet-wrap">
                <IoPersonCircle style={{fontSize: "3vw", marginRight:"5px", verticalAlign: "top"}}/>
                <div style={{display:"inline-table"}}>
                  <div className="tweet-name">{contents[post].author}</div>
                  <div className="tweet-time"> - {contents[post].time}</div>
                  <button
                    className="del-btn"
                    onMouseEnter={() => setOnMouse({del:id+1})}
                    onMouseLeave={() => setOnMouse({del:0})}
                    onClick={() => delPost(contents[post])}
                    style={{
                      backgroundColor: id+1 === onMouse.del ? "#ff000010" : "#00000000",
                      color: id+1 === onMouse.del ? "red" : "lightgray"}}
                  ><RiDeleteBinLine/></button>
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

const writeNewPost = (username, body, time) => {
  // A post entry.
  var postData = {
    author: username,
    uid: "",
    body: body,
    time: time,
  };

  // Get a key for a new Post.
  var newPostKey = db.ref().child('posts').push().key;
  postData.uid = newPostKey;

  // Write the new post's data simultaneously in the posts list and the user's post list.
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
