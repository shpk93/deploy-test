import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PopUp from './PopUp';
import AlertBox from './AlertBox';
axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_API_URL;

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: 'font-css';
`;

const SignUpArea = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 50vmin;
  min-height: 400px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: -0.9vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
`;

const Input = styled.input`
  ::placeholder {
    font-size: 1.1rem;
  }
  font-size: 1.1em;
  font-weight: normal;
  display: block;

  width: 80%;
  margin-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;
  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: black;
  border: 0;
  outline: 0;
  background: #eee;
  box-shadow: 0 0 0 2px transparent;

  &:focus {
    animation: boxShadow 0.3s backwards;

    box-shadow: 0 0 0 2px #008e43;
  }
`;

const InputPassword = styled.input`
  font-size: 1.1em;
  font-weight: normal;
  font-family: Arial;
  display: block;
  ::placeholder {
    font-family: 'font-css';
  }

  width: 80%;
  margin-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;
  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: black;
  border: 0;
  outline: 0;
  background: #eee;
  box-shadow: 0 0 0 2px transparent;

  &:focus {
    animation: boxShadow 0.3s backwards;

    box-shadow: 0 0 0 2px #008e43;
  }
`;

const SignUpBtn = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 18%;
  padding-top: 4%;
  font-size: 2rem;

  cursor: pointer;

  color: black;

  background: #008e43;
  :hover {
    border: 2px solid #008e43;
  }
`;

const SignInBtn = styled.div`
  width: 100%;
  height: 18%;
  padding-top: 4%;
  cursor: pointer;
  font-size: 2rem;

  color: black;
  :hover {
    border: 2px solid #fee518;
  }
  background: #fee518;
`;

const Modalback = styled.div`
  z-index: 900;
  position: fixed;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  place-items: center;
`;

// const SignUpText = styled.div`
//   margin-bottom: 30px;
//   font-size: 1.2em;
//   font-weight: bold;
// `;

function SignUp({ changeForm, closeModal, openModal }) {
  const [signUpInfo, setSignUpInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validateErr, setValidateErr] = useState('');
  const [successSignUp, setSuccessSignUp] = useState(false);

  //????????? ????????? ?????? ?????????
  const handleInputValue = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
  };

  //???????????? ????????? ????????????
  const signUpHandle = () => {
    let { username, email, password, confirmPassword } = signUpInfo;
    if (username && email && password && !validateErr && confirmPassword === password) {
      axios
        .post(`${url}users/signup`, signUpInfo)
        .then((result) => {
          setSuccessSignUp(true);
          // closeModal();
          // openModal();
          // alert('??????????????? ?????????????????????');
          // window.location.replace('/');
        })
        .catch((err) => {
          console.log(err);
          setValidateErr('?????? ????????? ????????? ????????? ????????????. ?????? ??? ?????? ?????? ????????????.');
        });
    }
  };
  //????????? ?????? ??????  //?????? ?????? ?????? ???????????? ???????????? (??????)
  const validateCheck = (inputName) => {
    const emailCheck =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordCheck = /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    let { email, password, username, confirmPassword } = signUpInfo;

    if (inputName === 'username') {
      return username.includes(' ') || username === '';
    }
    if (inputName === 'email') {
      return !emailCheck.test(email);
    }

    if (inputName === 'password') {
      return !passwordCheck.test(password);
    }
    if (inputName === 'confirmPassword') {
      if (!passwordCheck.test(password)) {
        return '??????????????? ????????? ??????????????? ??????????????? ?????????.';
      }
      if (passwordCheck.test(password) && password !== confirmPassword) {
        return '??????????????? ???????????? ????????????';
      }
    }
  };
  //????????? ?????? ??? true??? ?????????????????? ????????????
  const checkedInfo = (inputName) => {
    let validate = validateCheck(inputName);
    let { email, username, password, confirmPassword } = signUpInfo;
    if (validate) {
      if (inputName === 'username') {
        setValidateErr('???????????? ????????? ????????? ????????????.');
      }

      if (inputName === 'email') {
        setValidateErr('????????? ????????? ????????? ???????????????');
      }

      if (inputName === 'confirmPassword') {
        setValidateErr(validate);
      }

      if (inputName === 'password') {
        setValidateErr('??????????????? ????????? ??????????????? ??????????????? ?????????.');
        if (password === '') {
          return setValidateErr('');
        }
      }
    } else {
      setValidateErr('');
      if (inputName === 'username') {
        axios
          .get(`${url}users/?username=${username}`)
          .then((ok) => setValidateErr(''))
          .catch((err) => setValidateErr('????????? ????????? ?????????.'));
      }

      if (inputName === 'email') {
        axios
          .get(`${url}users/?email=${email}`)
          .then((ok) => setValidateErr(''))
          .catch((err) => setValidateErr('????????? ????????? ?????????.'));
      }
      if (inputName === 'password') {
        if (password !== confirmPassword && confirmPassword !== '') {
          return setValidateErr('??????????????? ???????????? ????????????');
        }
        setValidateErr('');
      }
    }
  };

  return (
    <ModalArea>
      <SignUpArea>
        <h1>SIGN UP</h1>
        <div>
          <span>?????????</span>
          <Input
            type="text"
            onBlur={() => {
              checkedInfo('username');
            }}
            onChange={handleInputValue('username')}
            placeholder="???????????? ??????????????????"
          />
        </div>
        <div>
          <span>?????????</span>
          <Input
            type="email"
            onBlur={() => {
              checkedInfo('email');
            }}
            onChange={handleInputValue('email')}
            placeholder="???????????? ??????????????????"
          />
        </div>
        <div>
          <span>???????????? / ??????</span>
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo('password');
            }}
            onChange={handleInputValue('password')}
            placeholder="??????????????? ??????????????????"
          />
        </div>
        <div>
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo('confirmPassword');
            }}
            onChange={handleInputValue('confirmPassword')}
            placeholder="??????????????? ?????? ??????????????????"
          />
        </div>
        <div style={{ color: 'red' }}>{validateErr}</div>

        <SignUpBtn onClick={signUpHandle}>Sign Up</SignUpBtn>

        <SignInBtn
          onClick={() => {
            changeForm();
          }}>
          Already a member?
        </SignInBtn>
      </SignUpArea>
      <Modalback onClick={() => closeModal()}></Modalback>
      {successSignUp ? <PopUp text={`??????????????? ?????????????????????.`} /> : null}
    </ModalArea>
  );
}

export default SignUp;
