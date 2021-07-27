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

  const logOutHandle = async () => {
    // users/signout
    axios.get(`${process.env.REACT_APP_API_URL}users/signout`).then((result) => {
      changeSideBar();
      closeLogInIcon();
    });
    window.location.replace('/');
  };
  const inputEl = useRef(null);
  const modifyUserHandle1 = () => {
    // 수정하기 버튼을 눌렀을때 인풋 창 포커스
    setTimeout(() => {
      inputEl.current.focus();
    }, 50);
    setEditMode(!isEditMode);
  };
  const modifyUserHandle2 = (e) => {
    // EditMode상태에서 닉네임 변경
    setUsername(e.target.value);
  };
  const modifyUserHandle3 = () => {
    setEditMode(false);
    SetErrMessage('');
    axios.get(`${process.env.REACT_APP_API_URL}users`).then((userInfo) => {
      setUsername(userInfo.data.data.username);
    });
  };
  const putRequest = (e) => {
    // 수정하기 버튼을 눌렀을때 바뀐 닉네임 적용
    axios
      .put(`${process.env.REACT_APP_API_URL}users/`, { username })
      .then((el) => {
        setEditMode(false);
        SetErrMessage('');
        alert('수정되었습니다. 다시 로그인하세요');
        logOutHandle();
      })
      .catch((err) => SetErrMessage('중복된 닉네임입니다. 확인 후 다시 시도하세요'));
  };
  const likeFilterHandle = async () => {
    let allPosts = await axios.get(`${process.env.REACT_APP_API_URL}posts`).then((data) => data.data.data);
    let filterData = allPosts.filter((el) => el.liked !== 0);
    setGetPosts(filterData);
  };
  const myPostfilterHandle = async () => {
    let allPosts = await axios.get(`${process.env.REACT_APP_API_URL}posts`).then((data) => data.data.data);
    let filterData = allPosts.filter((el) => el.username === username);
    setGetPosts(filterData);
  };
  return (
    <SideArea>
      <SideBar
        style={{
          transform: `translatex(${-xPosition}px)`,
          width: width,
          minHeight: height,
        }}>
        <div>
          <span>
            <button onClick={changeStatus} style={{ marginRight: '20px', fontSize: '20px' }}>
              x
            </button>
          </span>
          {userInfo.email}
        </div>
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
        <div>
          내가 좋요한 게시물<button onClick={likeFilterHandle}>클릭 !</button>
        </div>
        <div>
          내가 올린 게시물<button onClick={myPostfilterHandle}>클릭!</button>
        </div>
        <div>
          <button onClick={logOutHandle}>LogOut</button>
        </div>

        <div>만든사람들</div>
        <span>
          김병민 - Frontend
          <img
            src="https://cdn.discordapp.com/attachments/836100670565908520/869275312968577054/gnb_sns_03.png"
            alt=""
            style={{ width: '40px', height: '40px', marginRight: `20px` }}></img>
          <img
            src="https://cdn.discordapp.com/attachments/836100670565908520/869275312805011506/gnb_sns_01.png"
            alt=""
            style={{ width: '40px', height: '40px', marginRight: `20px` }}></img>
        </span>
        <div>
          <span>
            김상훈 - Backend
            <img
              src="https://cdn.discordapp.com/attachments/836100670565908520/869275312968577054/gnb_sns_03.png"
              alt=""
              style={{ width: '40px', height: '40px', marginRight: `20px` }}></img>
            <img
              src="https://cdn.discordapp.com/attachments/836100670565908520/869275312805011506/gnb_sns_01.png"
              alt=""
              style={{ width: '40px', height: '40px', marginRight: `20px` }}></img>
          </span>
        </div>
        <div>
          <span>
            박상현 - Backend
            <img
              src="https://cdn.discordapp.com/attachments/836100670565908520/869275312968577054/gnb_sns_03.png"
              alt=""
              style={{ width: '40px', height: '40px', marginRight: `20px` }}></img>
            <img
              src="https://cdn.discordapp.com/attachments/836100670565908520/869275312805011506/gnb_sns_01.png"
              alt=""
              style={{ width: '40px', height: '40px', marginRight: `20px` }}></img>
          </span>
        </div>
      </SideBar>
    </SideArea>
  );
}

export default Sidebar;
