import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import './Sidebar.css';
// import { ChangeHistoryRounded } from '@material-ui/icons';
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

function Sidebar({ changeSideBar, userInfo, closeLogInIcon, setGetPosts, getPosts }) {
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
  }, []);

  const logOutHandle = () => {
    // users/signout
    axios.get(`${process.env.REACT_APP_API_URL}users/signout`).then((result) => {
      changeSideBar();
      closeLogInIcon();
    });
  };
  const inputEl = useRef(null);
  const modifyUserHandle1 = () => {
    setTimeout(() => {
      inputEl.current.focus();
    }, 50);
    setEditMode(!isEditMode);
  };
  const modifyUserHandle2 = (e) => {
    setUsername(e.target.value);
  };
  const modifyUserHandle3 = () => {
    setEditMode(false);
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
            <input type="text" value={username} ref={inputEl} onChange={modifyUserHandle2}></input>
          ) : (
            <div>{username}</div>
          )}
          {isEditMode ? (
            <button onClick={putRequest}>수정하기</button>
          ) : (
            <button onClick={modifyUserHandle1}>닉네임 변경</button>
          )}
          {isEditMode ? <button onClick={modifyUserHandle3}>취소하기</button> : null}
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
