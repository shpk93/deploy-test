import { ChangeHistoryRounded } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './Sidebar.css';

const SideBar = styled.div`
  height: 100vh !important;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: red;
  transition: 0.8s ease;
`;

const SideArea = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 998;
  float: right;
  height: 100vh;
`;

function Sidebar({ changeSideBar, userInfo, closeLogInIcon }) {
  const changeStatus = () => {
    changeSideBar();
  };

  const width = 300;
  const height = '100vh';
  const [xPosition, setX] = useState(-width);

  useEffect(() => {
    setX(0);
  });

  const logOutHandle = () => {
    // users/signout
    axios.get(`${process.env.REACT_APP_API_URL}users/signout`).then((result) => {
      changeSideBar();
      closeLogInIcon();
    });
  };

  return (
    <SideArea>
      <SideBar
        style={{
          transform: `translatex(${-xPosition}px)`,
          width: width,
          minHeight: height,
        }}>
        <div>{userInfo.email}</div>
        <div>
          <div>{userInfo.username}</div>
          <div>edit</div>
        </div>
        <div>내가 좋요한 게시물</div>
        <div>내가 올린 게시물</div>
        <div>
          <button onClick={logOutHandle}>LogOut</button>
        </div>
        <div>
          <button onClick={changeStatus}>x</button>
        </div>
      </SideBar>
    </SideArea>
  );
}

export default Sidebar;
