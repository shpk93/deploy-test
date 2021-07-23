import React from 'react';
import Feed from '../components/Feed';

function FeedContainer({ feeds }) {
  return (
    <>
      {feeds.map((el) => (
        <Feed data={el} key={el.id} />
      ))}
    </>
  );
}

export default FeedContainer;
