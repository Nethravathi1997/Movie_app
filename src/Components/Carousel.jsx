// Carousel.js
import React from 'react';
import Slider from 'react-slick';
import './Carousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/medium/kalki-2898-ad-et00399593-1718275866.jpg',
  'https://images.thedirect.com/media/article_full/avengers-status.jpg',
  'https://cf-images.us-east-1.prod.boltdns.net/v1/static/5359769168001/68dcf50c-2bb6-451f-ba5d-60779e65b447/cb2e60a8-4c14-48db-a335-bc58419174d4/1280x720/match/image.jpg',
  'https://cdn1.edgedatg.com/aws/v2/abc/TheGoodDoctor/showimages/bbde12131a90c56b11db51dbf0780bfd/1200x627-Q80_bbde12131a90c56b11db51dbf0780bfd.jpg'
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="carousel-container" style={{ width: '80%', margin: 'auto' }}>
      <Slider {...settings} style={{height:'90%'}}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
