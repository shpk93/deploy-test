import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState, useEffect } from 'react';
import Navigator from './pages/Navigator';
import Mainpage from './pages/Mainpage';
import Sidebar from './components/Sidebar';
import axios from 'axios';
axios.defaults.withCredentials = true;

const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
}
  html {
    height: 100%;
  }
	body {
		padding: 0;
		margin: 0;
    height: 100%;
    background-color: #fdbd01;
    display:flex;
	}
`;

function App() {
  const [sideBarOn, setSideBarOn] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [isLogIn, setIsLogIn] = useState(false);
  const [getPosts, setGetPosts] = useState([]);

  const openLogInIcon = () => {
    setIsLogIn(true);
  };

  const closeLogInIcon = () => {
    setIsLogIn(false);
  };
  //Sidebar
  const changeSideBar = () => {
    setSideBarOn(!sideBarOn);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}posts`).then((data) => {
      setGetPosts(data.data.data);
    });
  }, []);

  return (
    <div>
      <GlobalStyle />
      <Navigator
        changeSideBar={changeSideBar}
        setUserInfo={setUserInfo}
        openLogInIcon={openLogInIcon}
        isLogIn={isLogIn}
        getPosts={getPosts}
        setGetPosts={setGetPosts}
      />
      {sideBarOn ? <Sidebar changeSideBar={changeSideBar} userInfo={userInfo} closeLogInIcon={closeLogInIcon} /> : null}
      <Mainpage getPosts={getPosts} />
    </div>
  );
}

export default App;
