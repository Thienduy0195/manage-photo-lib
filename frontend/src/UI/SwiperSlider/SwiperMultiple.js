import React from 'react';
import Swiper from 'react-id-swiper';

export default function SwiperMultiple(props) {
  const { children, autoplay } = props;
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: autoplay && {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  return <Swiper {...params}>{children}</Swiper>;
}
