import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  margin: 120px auto;
`;
const Modalback = styled.div`
  position: fixed;
  z-index: 999;
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
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
`;

function SignIn({ isLogIn, openLogInModal, changeModal, setUserInfo }) {
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
    const userInfo = { id: 1, email: 'dodo@naver.com', username: '상현' };
    if (loginInfo.email === '123@123.123' && loginInfo.password === '123') {
      changeModal();
      openLogInModal();
      setUserInfo(userInfo);
    }
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
        <Modalback>
          <ModalView>
            <h1>Sign In</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <span>이메일</span>
                <input type="email" onChange={handleInputValue('email')} />
              </div>
              <div>
                <span>비밀번호</span>
                <input type="password" onChange={handleInputValue('password')} />
              </div>
              <div>
                {/* <Link to="/signup"> */}
                아직 아이디가 없으신가요?
                {/* </Link> */}
              </div>
              <div>
                <button className="btn btn-login" type="submit" onClick={handleLogin}>
                  로그인
                </button>
              </div>
              <div>
                <button className="btn btn-login" type="submit" onClick={socialLoginHandler}>
                  소셜 로그인
                </button>
              </div>
              {errorMessage ? <div className="alert-box">{errorMessage}</div> : null}
            </form>
          </ModalView>
        </Modalback>
      )}
    </ModalArea>
  );
}

export default SignIn;
