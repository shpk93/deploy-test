import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import './Sidebar.css';
// import { ChangeHistoryRounded } from '@material-ui/icons';
import axios from 'axios';
axios.defaults.withCredentials = true;

const SideBar = styled.div`
  height: 100% !important;
  /* display: flex; */
  /* padding-top: 1.5vh; */
  flex-direction: column;
  background-color: #f3f4f4;
  transition: 0.8s ease;
  border: 5px solid #ffbc0d;
  border-right: 0px;
  /* margin-top: 1.5vh; */
  border-radius: 15px 0px 0px 0px;
  font-family: font-css;
`;

const SideArea = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 998;
  float: right;
  height: 100%;
  /* display: flex; */
`;

const SideBarHeaderStyle = styled.div`
  /* display: flex; */
  display: relative;
  flex-direction: column;
  padding-left: 5px;
  height: 150px;
  /* background-color: #018735; */
  /* border: 5px solid #ffbc0d; */
  border-radius: 10px 0px 0px 0px;
  background-image: url('../../imageFile/header.jpg');
  /* background-size: contain; */
`;

const UserImgStyle = styled.div`
  display: flex;
  /* justify-content:center; */
  align-items: center;
`;

const CloseButtonStyle = styled.button`
  border: none;
  margin-left: 10px;
  margin-top: 5px;
  background-color: transparent;
  padding: 0px;
`;

const EditButtonStyle = styled.button`
  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const SideBarNickStyle = styled.div`
  height: 100px;
  background-color: transparent;
  :hover {
    box-shadow: inset 100% 0 0 0 #ffbc0d;
  }
`;

const PostButtonStyle = styled.div`
  width: 100%;
  height: 90px;
  cursor: pointer;
  text-align: center;
  padding-top: 23px;
  border-top: 1px solid;
`;

const PostSpanStyle = styled.span`
  font-size: 20px;
`;

const LogOutStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 45vh;
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
        <SideBarHeaderStyle>
          <div></div>
          <CloseButtonStyle
            onClick={changeStatus}
            style={{ marginRight: '20px', fontSize: '20px', position: 'absolute', left: '-65px' }}>
            <KeyboardArrowRightIcon style={{ fontWeight: 'bold', fontSize: '50px' }} />
          </CloseButtonStyle>
          <UserImgStyle></UserImgStyle>
        </SideBarHeaderStyle>

        <SideBarNickStyle>
          {isEditMode ? (
            <div>
              <input type="text" value={username} ref={inputEl} onChange={modifyUserHandle2}></input>
              <div>
                <EditButtonStyle onClick={putRequest}>
                  <EditIcon />
                  수정하기
                </EditButtonStyle>
                <EditButtonStyle onClick={modifyUserHandle3}>
                  <CancelIcon />
                  취소하기
                </EditButtonStyle>
              </div>
            </div>
          ) : (
            <div style={{ paddingLeft: '30px' }}>
              <span style={{ fontSize: '35px' }}>{username}</span>
              <button onClick={modifyUserHandle1} style={{ border: 'none', backgroundColor: 'transparent' }}>
                <EditIcon />
              </button>
              {errMessage ? errMessage : null}
              {userInfo.email}
            </div>
          )}
        </SideBarNickStyle>
        <div>
          <PostButtonStyle onClick={likeFilterHandle}>
            <ThumbUpAltOutlinedIcon style={{ fontSize: '36px', marginBottom: '8px' }} />
            <PostSpanStyle>내가 좋요한 게시물</PostSpanStyle>
          </PostButtonStyle>
        </div>
        <div>
          <PostButtonStyle onClick={myPostfilterHandle} style={{ borderBottom: '1px solid' }}>
            <img src="../../imageFile/postIcon.png" alt="" />
            <PostSpanStyle>내가 올린 게시물</PostSpanStyle>
          </PostButtonStyle>
        </div>
        <LogOutStyle>
          {/* <button onClick={logOutHandle} style={{ color: 'red' }}></button> */}

          <img src="../../imageFile/power.png" alt="" onClick={logOutHandle} style={{ cursor: 'pointer' }} />
        </LogOutStyle>
      </SideBar>
    </SideArea>
  );
}

export default Sidebar;
