import React, { useState, useEffect } from 'react';
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
  width: 100vw;
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
  &:hover {
    cursor: pointer;
  }
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
  top: 0;
  bottom: auto;
  white-space: nowrap;

  text-shadow: 0px 0px 0 rgb(204, 142, 0), 0px -1px 0 rgb(156, 94, 0), 0px -2px 0 rgb(108, 46, 0),
    0px -3px 2px rgba(0, 0, 0, 0.04), 0px -3px 1px rgba(0, 0, 0, 0.5), 0px 0px 2px rgba(0, 0, 0, 0.2);
`;

const NextStyle = styled.div`
  /* background: linear-gradient(to right, rgb(250, 242, 214), rgb(211, 210, 210)); */
  z-index: 2;
  color: white;
  width: 20%;
  height: 100%;
  /* line-height: 34rem; */
  /* font-size: 3em; */
`;

const PrevStyle = styled.div`
  /* background: linear-gradient(to right, rgb(211, 210, 210), rgb(250, 242, 214)); */
  z-index: 2;
  color: white;
  width: 20%;
  height: 100%;
  /* line-height: 34rem; */
  /* font-size: 3em; */
`;

const BackgroundDiv = styled.div``;

function Carousel({ data, isLogIn, openModal, userInfo }) {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(data.liked);
  const [likes, setLikes] = useState(data.likes);

  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [nextIcon, setNextIcon] = useState(
    <NextStyle aria-hidden="true" className="carousel-control-next-icon">
      {/* &gt; */}
    </NextStyle>,
  );
  const [prevIcon, setPrevIcon] = useState(
    <PrevStyle aria-hidden="true" className="carousel-control-prev-icon">
      {/* &lt; */}
    </PrevStyle>,
  );
  const carouselData = data.slice(0, 5);

  const colorProps = ['#018735;', '#e9500e', '#881841', '#FAF2D6', '#332771'];
  const [back, setBack] = useState(0);

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
        indicators="true"
        nextLabel=""
        prevLabel=""
        interval={3000}
        pause="false">
        {carouselData.map((el, idx) => {
          return (
            <CarouselBoot.Item
              style={{
                position: 'relative',
                width: '100%',
                height: '523px',
                backgroundColor: colorProps[idx],
              }}>
              {/* <span aria-hidden="true" className="carousel-control-next-icon" /> */}
              <div>
                <Image
                  className="d-block w-100"
                  // src={el.img_url}
                  src="../mock/로스트치킨.png"
                  alt=""
                  onClick={() => {
                    return handleClickFeed(el.id);
                  }}
                />
                <div></div>
              </div>
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
