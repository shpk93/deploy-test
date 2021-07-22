import React, { useState } from 'react';
import styled from 'styled-components';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';

const Menu = styled.div`
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 300px;
  margin: 1rem;
  position: relative;
  width: 300px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const ContentArea = styled.div`
  position: relative;
  div:nth-child(1) {
    margin-left: 10px;
    font-weight: bold;
  }
  div:nth-child(2) {
    margin-left: 10px;
  }
  button:nth-child(3) {
    position: absolute;
    top: 50px;
    left: 130px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
`;

const MenuImg = styled.img`
  width: 100%;
  height: 70%;
`;

function Feed({ data }) {
  const [like, setLike] = useState(false);

  const changeLike = () => {
    setLike(!like);
  };

  return (
    <Menu>
      <MenuImg src="../imageFile/dumImg.jpg" alt=""></MenuImg>
      <ContentArea>
        <div>{data.title}</div>
        <div>{data.content}</div>
        <button onClick={changeLike}>
          {like ? <ThumbUpAltTwoToneIcon style={{ color: 'red' }} /> : <ThumbUpAltOutlinedIcon />}
        </button>
      </ContentArea>
    </Menu>
  );
}

export default Feed;
// {
//   "id": 1,
//   "username":'상현',
//   "title":"파워샌드위치",
//   "content": "이친구를먹으면파워해져요",
//   "mainmenu": "스파이시 쉬림프",
//   "image_url": "/upload/menu/스파이스쉬림프(샌드위치)_1.png"
// }
