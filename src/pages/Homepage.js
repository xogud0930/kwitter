import React, { useState, useEffect } from 'react';
import { IoPersonCircle  } from 'react-icons/io5';
import { RiImage2Line, RiDeleteBinLine  } from 'react-icons/ri';
import { Button, Tooltip, Layout, Input, Empty, message } from 'antd';
import { db } from '../Firebase'
import './Homepage.css';
import 'antd/dist/antd.css';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import axios from 'axios';

const { Header, Content } = Layout;
const { TextArea } = Input;

const Homepage = () => {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    isActive: false,
  })


  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleOnClick = () => {
    if(state.isActive) {
      writeNewPost(text);
      setText("");
      setState({ isActive:false });
    }
  }

  const checkEmpty = () => {
    text === "" ? setState({ isActive:false }) : setState({ isActive:true })
  }

  const [contents, setContents] = useState("");

  const getPosts = () => {
    axios.get(
      '/api/post')
    .then(res => {
        console.log(Object.values(res.data.posts));
        setContents(Object.values(res.data.posts));
    })  
    .catch(error => {
        console.log(error)
    });
  }

  const delPost = (post) => {
    var message = "해당 트윗을 삭제하겠습니까?"
    if(window.confirm(message)) {
      if(window.localStorage.getItem("userId") == post.userId) {
        console.log(post.id)
        axios.post(
          '/api/post/del', {id: post.id})
        .then(res => {
            console.log(res);
            getPosts();
        })  
        .catch(error => {
            console.log(error)
        });
      } else {
        alert("권한이 없습니다.");
      }
    }
  }

  const writeNewPost = (body) => {
    var postData = {
      userId: window.localStorage.getItem("userId"),
      body: body,
      time: getTime(),
    };
  
    axios.post(
      '/api/post/add',postData)
    .then(res => {
        console.log(res);
        getPosts();
    })  
    .catch(error => {
        console.log(error)
    });
  }
  
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

  useEffect(() => {
    getPosts();
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
            <div className="tweet-content"> 
              <div className="tweet-wrap">
                <IoPersonCircle style={{fontSize: "3vw", marginRight:"5px", verticalAlign: "top"}}/>
                <div style={{display:"inline-table"}}>
                  <div className="tweet-name">{contents[post].userId}</div>
                  <div className="tweet-time"> - {contents[post].time}</div>
                  <button
                    className="del-btn"
                    key={id}
                    onClick={() => delPost(contents[post])}
                  ><RiDeleteBinLine/></button>
                  <div className="tweet-body">{contents[post].body}</div>
                </div>
              </div>
            </div>
          </div>  
        )))
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{marginTop:"20vh"}} />}

      </Content>
    </div>
  ); 
}

export default Homepage
