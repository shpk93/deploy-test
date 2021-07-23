import React, { useState, useEffect, useRef } from 'react';
// import './Navigator.css';
import styled from 'styled-components';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Search from '../components/Search';
import SignUp from '../components/SignUp';

import SignIn from '../components/SignIn';

// 스타일컴퍼넌트
const HeaderArea = styled.div`
  position: relative;
  width: 100%;
  /* height: 150px; */
  background-color: #fdbd01;
`;

const HeaderWrap = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  top: 0;
  left: 0;
  z-index: 950;
  width: 100%;
  height: 150px;
  transition: 1.5s ease;
  background-color: #018735;
  &.hide {
    transform: translateY(-150px);
  }
`;

const ImageLog = styled.img`
  width: 10%;
  height: 50%;
  margin-left: 20px;
`;

const ButtonStyle = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: transparent;
`;

// 네이게이션바 구현 목록
function Navigator({ changeSideBar, setUserInfo, openLogInIcon, isLogIn }) {
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);
  const [isModal, setModal] = useState(false);
  const [isOpenSignUp, SetIsOpenSignUp] = useState(false);

  // functions

  const closeModal = () => {
    setModal(false);
    SetIsOpenSignUp(false);
  };

  const openModal = () => {
    setModal(true);
  };

  //회원가입 모달폼 오픈
  const changeForm = () => {
    SetIsOpenSignUp(!isOpenSignUp);
    openModal();
  };

  // 스크롤
  const throttle = function (callback, waitTime) {
    let timerId = null;
    return (e) => {
      if (timerId) return;
      timerId = setTimeout(() => {
        callback.call(this, e);
        timerId = null;
      }, waitTime);
    };
  };

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  // userEffect
  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  return (
    <HeaderArea>
      <HeaderWrap className={hide && 'hide'}>
        <ImageLog src="../imageFile/mySubwayLog1.png" alt="" />
        <Search />
        {isLogIn ? (
          //마이페이지 버튼
          <ButtonStyle type="button" onClick={changeSideBar}>
            <AccountCircleOutlinedIcon style={{ color: 'white' }} />
          </ButtonStyle>
        ) : (
          //로그인 버튼
          <ButtonStyle type="button" onClick={openModal}>
            <LockOpenOutlinedIcon style={{ color: 'white' }} />
          </ButtonStyle>
        )}
      </HeaderWrap>
      {isModal ? (
        isOpenSignUp ? (
          <SignUp changeForm={changeForm} closeModal={closeModal} openModal={openModal} />
        ) : (
          <SignIn
            isLogIn={isLogIn}
            openLogInIcon={openLogInIcon}
            openModal={openModal}
            setUserInfo={setUserInfo}
            closeModal={closeModal}
            changeForm={changeForm}
          />
        )
      ) : null}
    </HeaderArea>
  );
}

export default Navigator;
