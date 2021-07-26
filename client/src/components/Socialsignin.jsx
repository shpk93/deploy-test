import React, { useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Socialsignin = ({ closeLogInIcon }) => {
  const getAccessToken = async (authorizationCode) => {
    let resp = await axios.post(`${process.env.REACT_APP_API_URL}users/auth`, { authorizationCode });
    closeLogInIcon();
    if (resp.status === 201) {
      alert('회원가입 되었습니다. 마이페이지 창에서 닉네임을 변경해주세요');
    }
    window.location.replace('/'); // 단점 로딩을 두번함 .
  };

  useEffect(() => {
    // 소셜로 부터 리디렉션 됬을때 접근코드를 서버에게보냄.
    let url = new URL(window.location.href);
    let authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  }, []);
  return <></>;
};

export default Socialsignin;
