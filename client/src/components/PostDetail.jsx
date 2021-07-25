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

const MarginDiv = styled.div`
  display: flex;
`;

function PostDetail({ isLogIn, openLogInIcon, openModal, setUserInfo, closeModal, changeForm }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <ModalArea>
      <MarginDiv>
        <ModalView>{/*내용*/}</ModalView>
        <Modalback onClick={() => closeModal()}></Modalback>
      </MarginDiv>
    </ModalArea>
  );
}

export default SignIn;
