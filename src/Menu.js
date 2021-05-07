import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Menu.css';
import { Layout, Menu } from 'antd';

import NavBar from './NavBar';
import Routes from './Routes';

const { Header, Content, Footer, Sider } = Layout;

const Testmenu = () => {

    return(
        <Layout className="site-main-layout">
            <Router>
                <Sider className="site-sider"
                theme='light'
                width='15vw'
                >
                    <NavBar />
                </Sider>

                <Layout className="site-content-layout">
                    <div className="contents">
                        <Routes />
                    </div>
                    <footer>Ant Design ©2018 Created by Ant UED</footer>
                </Layout>
            </Router>
        </Layout>
    )
};

export default Testmenu