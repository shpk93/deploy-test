import React, { useState, useEffect, useRef } from 'react';
// import './Navigator.css';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
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

const Mypage = styled.div`
  display: flex;
  margin-right: 20px;
  width: 5%;
  height: 30%;
`;

const FormArea = styled.form`
  display: flex;
`;

const LogInButton = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: transparent;
`;

const SearchArea = styled.input`
  background-color: transparent;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: white;

  ::placeholder {
    color: white;
  }
`;

// 네이게이션바 구현 목록
function Navigator({ changeSideBar, setUserInfo }) {
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);
  const [isLogIn, setIsLogIn] = useState(false);
  const [openModal, setModal] = useState(false);
  const [isOpenSignUp, SetIsOpenSignUp] = useState(false);

  // functions
  const openLogInModal = () => {
    setIsLogIn(true);
  };
  const closeLogInModal = () => {
    setModal(false);
  };

  const changeModal = () => {
    setModal(true);
  };

  //회원가입 모달폼 오픈
  const changeForm = () => {
    SetIsOpenSignUp(!isOpenSignUp);
    changeModal();
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
        <Mypage>
          <div>
            <FormArea action="/action_page.php">
              <SearchArea type="text" placeholder="Search.." name="search" />
              <LogInButton type="submit">
                <SearchIcon style={{ color: 'white' }} />
              </LogInButton>
            </FormArea>
          </div>
          {isLogIn ? (
            <LogInButton
              type="button"
              className="btn btn-demo"
              data-toggle="modal"
              data-target="#myModal2"
              onClick={changeSideBar}>
              <AccountCircleOutlinedIcon style={{ color: 'white' }} />
            </LogInButton>
          ) : (
            //로그인 폼
            <LogInButton type="button" onClick={changeModal}>
              <LockOpenOutlinedIcon style={{ color: 'white' }} />
            </LogInButton>
          )}
        </Mypage>
      </HeaderWrap>
      {openModal ? (
        isOpenSignUp ? (
          <SignUp changeForm={changeForm} closeLogInModal={closeLogInModal} />
        ) : (
          <SignIn
            isLogIn={isLogIn}
            openLogInModal={openLogInModal}
            changeModal={changeModal}
            setUserInfo={setUserInfo}
            closeLogInModal={closeLogInModal}
            changeForm={changeForm}
          />
        )
      ) : null}
    </HeaderArea>
  );
}

export default Navigator;
