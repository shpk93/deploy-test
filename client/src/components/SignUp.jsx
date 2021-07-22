import React from 'react';
import styled from 'styled-components';

const SignUpArea = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;

  width: 100%;
  max-width: 400px;
  height: 400px;
  margin: -70px auto;
  padding: 60px 0;

  background: white;
  box-shadow: 0 0 15px #333;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 35px;
`;

const Input = styled.input`
  font-size: 1.1em;
  font-weight: normal;

  display: block;

  width: 85%;
  margin-top: 2px;
  margin-left: 30px;
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

const SignUpBtn = styled.button`
  margin-top: 30px;
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

const SignInBtn = styled.button`
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

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
`;

const Modalback = styled.div`
  z-index: 900;
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

const SignUpText = styled.div`
  margin-bottom: 30px;
  font-size: 1.2em;
  font-weight: bold;
`;

function SignUp({ changeForm, closeLogInModal }) {
  return (
    <ModalArea>
      <SignUpArea>
        <SignUpText>회원가입</SignUpText>
        <Form action="index.html" method="post">
          <div>
            <Input required type="text" name="name" placeholder="닉네입을 입력해주세요" />
          </div>
          <div>
            <Input required type="email" name="email" placeholder="이메일을 입력해주세요" />
          </div>
          <div>
            <Input required type="password" name="password" placeholder="비밀번호를 입력해주세요" />
          </div>
          <div>
            <div>
              <SignUpBtn type="submit">Sign Up</SignUpBtn>
            </div>
            <div>
              <SignInBtn
                type="button"
                onClick={() => {
                  changeForm();
                }}>
                Already a member?
              </SignInBtn>
            </div>
            <div>
              <SocialSignInBtn type="button">Social LogUp</SocialSignInBtn>
            </div>
          </div>
        </Form>
      </SignUpArea>
      <Modalback onClick={() => closeLogInModal()}></Modalback>
    </ModalArea>
  );
}

export default SignUp;
