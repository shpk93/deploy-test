import React from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import FeedContainer from '../components/FeedContainer';
import PostButton from '../components/PostButton';

const BodyArea = styled.div`
  font-family: 'font-css';
  margin-top: 150px;
  padding: 0;
  height: 100%;
  width: 100%;
`;

function Mainpage({ getPosts, isLogIn, openModal, handleSetPosts, userInfo, text }) {
  // document.querySelector("#SearchBox")

  return (
    <BodyArea>
      <Carousel isLogIn={isLogIn} openModal={openModal} userInfo={userInfo} />
      <FeedContainer
        feeds={getPosts}
        isLogIn={isLogIn}
        openModal={openModal}
        handleSetPosts={handleSetPosts}
        userInfo={userInfo}
        text1={text}
      />
      <PostButton isLogIn={isLogIn} />
    </BodyArea>
  );
}

export default Mainpage;
