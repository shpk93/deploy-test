import React from 'react';
import styled from 'styled-components';
import Feed from '../components/Feed';
import Carousel from '../components/Carousel';

import SignUp from '../components/SignUp';

const BodyArea = styled.div`
  margin-top: 150px;
  padding: 0;
  height: 100%;
`;

const postMokdata = [
  {
    id: 1,
    username: '상현',
    title: '파워샌드위치',
    content: '이친구를먹으면파워해져요',
    mainmenu: '스파이시 쉬림프',
    image_url: '/upload/menu/스파이스쉬림프(샌드위치)_1.png',
  },
  {
    id: 2,
    username: '병민',
    title: '상큼샌드위치',
    content: '이친구를먹으면상큼해져요',
    mainmenu: '로스트 치킨',
    image_url: '/upload/menu/로스트치킨(샌드위치)_1.png',
  },
  {
    id: 3,
    username: '상훈',
    title: '미친샌드위치',
    content: '이친구를먹으면미친해져요',
    mainmenu: '에그마요',
    image_url: '/upload/menu/에그마요(샌드위치)_1.png',
  },
  {
    id: 4,
    username: '선아',
    title: '돌아와샌드위치',
    content: '이친구를먹으면돌아와져요',
    mainmenu: '비엘티',
    image_url: '/upload/menu/비엘티(샌드위치)_1.png',
  },
  {
    id: 5,
    username: '유진',
    title: '고수샌드위치',
    content: '이친구를먹으면고수가되요',
    mainmenu: '써브웨이 클럽',
    image_url: '/upload/menu/써브웨이클럽(샌드위치)_1.png',
  },
  {
    id: 7,
    username: 'freshMan',
    title: '클래식이진리지',
    content: '그냥드세요',
    mainmenu: '미트볼',
    image_url: '/upload/menu/미트볼(샌드위치)_1.png',
  },
];

const images = [
  { imgUrl: '../imageFile/pngwing.com1.png' },
  { imgUrl: '../imageFile/pngwing.com2.png' },
  { imgUrl: '../imageFile/pngwing.com3.png' },
  { imgUrl: '../imageFile/pngwing.com4.png' },
  { imgUrl: '../imageFile/pngwing.com5.png' },
];

function Mainpage() {
  return (
    <BodyArea>
      <div>
        <div>TOP5</div>
        <div>
          <Carousel images={images} />
        </div>
        <hr></hr>
        {postMokdata.map((el) => (
          <Feed data={el} key={el.id} />
        ))}
        {/* <SignUp /> */}
      </div>
    </BodyArea>
  );
}

export default Mainpage;
