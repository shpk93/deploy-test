import { ChangeHistoryRounded } from '@material-ui/icons';
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

function Sidebar({ changeSideBar, userInfo }) {
  const changeStatus = () => {
    changeSideBar();
  };

  const width = 300;
  const height = '100vh';
  const [xPosition, setX] = useState(-width);

  useEffect(() => {
    setX(0);
  });

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  return (
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
        <button onClick={changeStatus}>LogOut</button>
      </div>
      <div>
        <button onClick={changeStatus}>x</button>
      </div>
    </SideBar>
  );
}

export default Sidebar;
