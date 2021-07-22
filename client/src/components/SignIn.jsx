import React, { useState } from 'react';

import styled from 'styled-components';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
`;
const Modalback = styled.div`
  z-index: -1;
  position: fixed;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  z-index: 999;
  width: 300px;
  height: 300px;
  margin: 0px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: 180px auto;
  left: 0;
  right: 0;
`;

const Input = styled.input`
  font-size: 1.1em;
  font-weight: normal;

  display: block;

  width: 85%;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 23px;

  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: #8609e3;
  border: 0;
  outline: 0;
  background: #eee;
  box-shadow: 0 0 0 2px transparent;

  &:focus {
    animation: boxShadow 0.3s backwards;

    box-shadow: 0 0 0 2px #8609e3;
  }
`;

const SignInBtn = styled.button`
  margin-top: 2px;
  width: 100%;
  height: auto;
  padding-top: 23px;
  padding-bottom: 23px;

  cursor: pointer;

  border: 0;
  border-top: 1px solid #eee;
  outline: 0;
  font-size: 1.2em;
  font-weight: bold;

  color: white;
  background: #8609e3;
`;

const SocialSignInBtn = styled.button`
  width: 100%;
  height: auto;
  padding-top: 23px;
  padding-bottom: 23px;
  cursor: pointer;
  border: 0;
  border-top: 1px solid #eee;
  outline: 0;
  font-size: 1.2em;
  font-weight: bold;

  color: white;
  background: red;
`;

const SignUpBtn = styled.button`
  width: 100%;
  height: auto;
  padding-top: 23px;
  padding-bottom: 23px;
  cursor: pointer;

  border: 0;
  border-top: 1px solid #eee;
  outline: 0;

  font-size: 0.9em;
  color: #333;
  background: white;
`;

const AlertBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  background-color: mediumvioletred;
  padding: 1em 2.4em;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  white-space: nowrap;

  /* 경고 창은 화면 위쪽에 숨겨둔다. */
  top: 250px;
  transition-duration: 300ms;
  z-index: 999;
`;

const MarginDiv = styled.div`
  display: flex;
`;

function SignIn({ isLogIn, openLogInModal, changeModal, setUserInfo, closeLogInModal, changeForm }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  //로그인 요청을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  //로그인 요청하는 곳
  const handleLogin = () => {
    if (!loginInfo.email || !loginInfo.password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
      return;
    }

    axios
      .post(`${url}users/signin`, { email: loginInfo.email, password: loginInfo.password })
      .then((result) => {
        // console.log(result);
        // console.log(result);
        if (result.data.message === 'ok') {
          changeModal();
          openLogInModal();
          axios.get(`${url}users`).then((data) => setUserInfo(data.data.data));
          // setUserInfo(userInfo);
        }
      })
      .catch((err) => {
        setErrorMessage('이메일 혹은 비밀번호가 틀립니다.');
      });
  };

  //소셜 로그인 요청하는 곳
  const socialLoginHandler = () => {
    // window.location.assign(this.GITHUB_LOGIN_URL)
    changeModal();
    openLogInModal();
  };

  return (
    <ModalArea>
      {isLogIn ? null : (
        <MarginDiv>
          <ModalView>
            <h1>Sign In</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <span>이메일</span>
                <Input type="email" onChange={handleInputValue('email')} placeholder="이메일을 입력해주세요" />
              </div>
              <div>
                <span>비밀번호</span>
                <Input type="password" onChange={handleInputValue('password')} placeholder="비밀번호를 입력해주세요" />
              </div>
              <div>
                <SignUpBtn onClick={() => changeForm()}>아직 아이디가 없으신가요?</SignUpBtn>
              </div>
              {errorMessage ? <AlertBox>{errorMessage}</AlertBox> : null}
              <div>
                <SignInBtn className="btn btn-login" type="submit" onClick={handleLogin}>
                  Sign In
                </SignInBtn>
              </div>
              <div>
                <SocialSignInBtn className="btn btn-login" type="submit" onClick={socialLoginHandler}>
                  Social LogIn
                </SocialSignInBtn>
              </div>
            </form>
          </ModalView>
          <Modalback onClick={() => closeLogInModal()}></Modalback>
        </MarginDiv>
      )}
    </ModalArea>
  );
}

export default SignIn;
