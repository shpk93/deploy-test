import React from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import FeedContainer from '../components/FeedContainer';
import SignUp from '../components/SignUp';

const BodyArea = styled.div`
  margin-top: 150px;
  padding: 0;
  height: 100%;
`;

const postMockdata = [
  {
    id: 1,
    username: '상현',
    title: '파워샌드위치',
    mainmenu: '스파이시 쉬림프',
    image_url: '/upload/menu/스파이스쉬림프(샌드위치)_1.png',
    likes: 250,
    liked: 0,
  },
  {
    id: 2,
    username: '병민',
    title: '상큼샌드위치',
    mainmenu: '로스트 치킨',
    image_url: '/upload/menu/로스트치킨(샌드위치)_1.png',
    likes: 6,
    liked: 1,
  },
  {
    id: 3,
    username: '상훈',
    title: '미친샌드위치',
    mainmenu: '에그마요',
    image_url: '/upload/menu/에그마요(샌드위치)_1.png',
    likes: 89,
    liked: 0,
  },
  {
    id: 4,
    username: '선아',
    title: '돌아와샌드위치',
    mainmenu: '비엘티',
    image_url: '/upload/menu/비엘티(샌드위치)_1.png',
    likes: 1,
    liked: 0,
  },
  {
    id: 5,
    username: '유진',
    title: '고수샌드위치',
    mainmenu: '써브웨이 클럽',
    image_url: '/upload/menu/써브웨이클럽(샌드위치)_1.png',
    likes: 0,
    liked: 0,
  },
  {
    id: 7,
    username: 'freshMan',
    title: '클래식이진리지',
    content: '그냥드세요',
    mainmenu: '미트볼',
    image_url: '/upload/menu/미트볼(샌드위치)_1.png',
    likes: 22,
    liked: 0,
  },
];

const images = [
  { imgUrl: '../imageFile/pngwing.com1.png' },
  { imgUrl: '../imageFile/pngwing.com2.png' },
  { imgUrl: '../imageFile/pngwing.com3.png' },
  { imgUrl: '../imageFile/pngwing.com4.png' },
  { imgUrl: '../imageFile/pngwing.com5.png' },
];

function Mainpage({}) {
  return (
    <BodyArea>
      <div>
        <div>TOP5</div>
        <div>
          <Carousel images={images} />
        </div>
        <hr></hr>
        <FeedContainer feeds={postMockdata} />
        {/* <SignUp /> */}
      </div>
    </BodyArea>
  );
}

export default Mainpage;
