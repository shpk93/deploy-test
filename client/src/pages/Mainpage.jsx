import React from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import FeedContainer from '../components/FeedContainer';

const BodyArea = styled.div`
  margin-top: 150px;
  padding: 0;
  height: 100%;
  width: 100%;
`;

const images = [
  { imgUrl: '../imageFile/pngwing.com1.png' },
  { imgUrl: '../imageFile/pngwing.com2.png' },
  { imgUrl: '../imageFile/pngwing.com3.png' },
  { imgUrl: '../imageFile/pngwing.com4.png' },
  { imgUrl: '../imageFile/pngwing.com5.png' },
];

function Mainpage({ getPosts, isLogIn, openModal, handleSetPosts, userInfo }) {
  return (
    <BodyArea>
      <Carousel data={getPosts} isLogIn={isLogIn} openModal={openModal} userInfo={userInfo} />
      <FeedContainer
        feeds={getPosts}
        isLogIn={isLogIn}
        openModal={openModal}
        handleSetPosts={handleSetPosts}
        userInfo={userInfo}
      />
    </BodyArea>
  );
}

export default Mainpage;
