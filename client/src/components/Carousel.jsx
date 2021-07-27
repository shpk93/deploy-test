import React, { useState } from 'react';
import CarouselBoot from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import PostDetail from './PostDetail';
import axios from 'axios';
axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_API_URL;

const CarouselBootStyle = styled(CarouselBoot)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* position: absolute; */
  /* width: 100%; */
  /* height: 100vh; */
  height: 523px;
  background-color: #018735;

  margin: 3px 0 30px 0;
`;

const Image = styled.img`
  /* z-index: 1; */
  width: 100%;
  height: 55vh;
  /* margin-top: 10px; */
  object-fit: contain;
`;

const RankImg = styled.img`
  z-index: 1;
  position: absolute;
  top: 60px;
  left: 80px;
  width: 100px;
  height: 80px;
`;

const FontDivStyle = styled.div`
  font-family: font-css;
  font-size: 100px;
  /* position: absolute;
  top: 2%;
  left: 32%; */
  /* margin: 0 auto; */
  text-align: center;
`;

const Caption = styled(CarouselBoot.Caption)`
  font-family: font-css;
  font-size: 100px;
  text-align: center;
  color: #fcbd05;
  /* padding: 10%; */
  top: 0;
  bottom: auto;
`;

// const NextStyle = styled.div`
//   background: linear-gradient(to right, rgb(250, 242, 214), rgb(211, 210, 210));
//   z-index: 2;
//   width: 100%;
//   height: 100%;
// `;

// const PrevStyle = styled.div`
//   background: linear-gradient(to right, rgb(211, 210, 210), rgb(250, 242, 214));
//   z-index: 2;
//   width: 100%;
//   height: 100%;
// `;

function Carousel({ data, isLogIn, openModal, userInfo }) {
  //   console.log(data);
  //   id: 7
  // img_url: "https://my-subway-resources.s3.ap-northeast-2.amazonaws.com/images/main/K%EB%B0%94%EB%B9%84%ED%81%90.jpg"
  // liked: 0
  // likes: 1
  // mainmenu: "K-바비큐"
  // title: "병민쓰 초이스 풀드포크"
  // username: "상훈 카카오"
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(data.liked);
  const [likes, setLikes] = useState(data.likes);
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [nextIcon, setNextIcon] = useState(<div></div>);
  const [prevIcon, setPrevIcon] = useState(<div></div>);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const openPostDetail = () => {
    setIsOpenPostDetail(true);
  };
  const closePostDetail = () => {
    setIsOpenPostDetail(false);
  };

  const handleClickLike = async () => {
    console.log('like button clicked! likes:', likes, ' liked:', liked, ' isLogIn:', isLogIn);
    if (!!liked) {
      console.log('like button clicked! likes:', likes, ' liked:', liked);
      setLiked(0);
      setLikes(likes - 1);
      //delete likes api
      await axios.delete(`${url}likes/${data.id}`);
    } else {
      if (isLogIn) {
        setLiked(1);
        setLikes(likes + 1);
        console.log('like button clicked! likes:', likes, ' liked:', liked);
        //post likes api
        await axios.post(`${url}likes`, { post_id: data.id });
      } else {
        openModal();
      }
    }
  };

  const handleClickFeed = async (post_id) => {
    let postDetailData = await axios.get(`${url}posts/${post_id}`);
    setPostDetail(postDetailData.data.data);
    openPostDetail();
  };

  return (
    <>
      <CarouselBootStyle
        activeIndex={index}
        onSelect={handleSelect}
        nextIcon={nextIcon}
        prevIcon={prevIcon}
        indicators="false"
        nextLabel=""
        prevLabel="">
        {data.map((el, idx) => {
          return (
            <CarouselBoot.Item>
              {/* <span aria-hidden="true" className="carousel-control-next-icon" /> */}
              <div>
                <Image
                  className="d-block w-100"
                  src={el.img_url}
                  alt=""
                  onClick={() => {
                    return handleClickFeed(el.id);
                  }}
                />
              </div>
              {/* , flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  */}
              {/* <FontDivStyle>
                <div>Who is</div>
                <div>The Fxxking best</div>
              </FontDivStyle> */}
              <div styled={{ position: 'absolute' }}>
                <Caption>
                  <p>{el.title}</p>
                  {/* <p >The Fxxking best</p> */}
                </Caption>
              </div>
            </CarouselBoot.Item>
          );
        })}
      </CarouselBootStyle>
      {isOpenPostDetail ? (
        <PostDetail
          postDetail={postDetail}
          closePostDetail={closePostDetail}
          liked={liked}
          likes={likes}
          handleClickLike={handleClickLike}
          userInfo={userInfo}
          isLogIn={isLogIn}
        />
      ) : null}
    </>
  );
}

export default Carousel;
