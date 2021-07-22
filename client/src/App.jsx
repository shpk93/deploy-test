import 'bootstrap/dist/css/bootstrap.min.css';

import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';

import Navigator from './pages/Navigator';
import Mainpage from './pages/Mainpage';
import Sidebar from './components/Sidebar';

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

const BodyArea = styled.div`
  margin-top: 150px;
  padding: 0;
  height: 100%;
`;

const SideArea = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 998;
  float: right;
  height: 100vh;
`;

function App() {
  const [sideBarOn, setSideBarOn] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  //Sidebar
  const changeSideBar = () => {
    console.log('작동중');
    setSideBarOn(!sideBarOn);
    console.log(sideBarOn);
  };

  return (
    <div>
      <GlobalStyle />
      <Navigator changeSideBar={changeSideBar} setUserInfo={setUserInfo} />
      {sideBarOn ? (
        <SideArea>
          <Sidebar changeSideBar={changeSideBar} userInfo={userInfo} />
        </SideArea>
      ) : null}
      <BodyArea>
        <Mainpage />
      </BodyArea>
    </div>
  );
}

export default App;
