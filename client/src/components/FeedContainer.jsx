import React from 'react';
import Feed from '../components/Feed';
import styled from 'styled-components';

const Container = styled.div`
  width: 80vw;
  height: 70vh;
  position: absolute;
  background-color: white;
  margin-left: 10%;
  margin-right: 10%;
  overflow: auto;
`;
function FeedContainer({ feeds, isLogIn, openModal }) {
  return (
    <Container>
      {feeds.map((el) => (
        <Feed data={el} key={el.id} isLogIn={isLogIn} openModal={openModal} />
      ))}
    </Container>
  );
}

export default FeedContainer;
