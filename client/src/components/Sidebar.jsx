import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './Sidebar.css';
import { ChangeHistoryRounded } from '@material-ui/icons';
import axios from 'axios';
axios.defaults.withCredentials = true;

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
  const [isEditMode, setEditMode] = useState(false);
  const [errMessage, SetErrMessage] = useState('');
  const [username, setUsername] = useState(userInfo.username);

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

  const modifyUserHandle1 = () => {
    setEditMode(!isEditMode);
  };
  const modifyUserHandle2 = (e) => {
    setUsername(e.target.value);
    // axios.put(`${process.env.REACT_APP_API_URL}users/`, {username:});
  };
  const putRequest = (e) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}users/`, { username })
      .then((el) => {
        setEditMode(false);
      })
      .catch((err) => SetErrMessage('중복된 닉네임입니다. 확인 후 다시 시도하세요'));
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
          {isEditMode ? (
            <input type="text" value={username} onChange={modifyUserHandle2}></input>
          ) : (
            <div>{username}</div>
          )}
          {isEditMode ? <button onClick={putRequest}>수정하기</button> : <div onClick={modifyUserHandle1}>edit</div>}
          {errMessage ? errMessage : null}
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
