import React, { useState } from 'react';
import CarouselBoot from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Image = styled.img`
  width: 300px;
  height: 150px;
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

function Carousel(props) {
  const { images } = props;
  console.log(images);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <CarouselBoot activeIndex={index} onSelect={handleSelect}>
      {images.map((el, idx) => {
        console.log(el, idx);
        return (
          <CarouselBoot.Item>
            <Image className="d-block w-100" src={el.imgUrl} alt="" />
            <CarouselBoot.Caption>
              <h3>{idx + 1}등</h3>
              <p>{idx + 1}번째로 맛있는 맛!</p>
              <RankImg src={`../imageFile/${idx + 1}등.png`} />
            </CarouselBoot.Caption>
          </CarouselBoot.Item>
        );
      })}
    </CarouselBoot>
  );
}

export default Carousel;
