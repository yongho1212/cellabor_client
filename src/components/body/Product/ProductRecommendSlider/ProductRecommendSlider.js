import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SampleNextArrow = ({className, style, onClick}) => {
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
    const SamplePrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }


const ProductRecommendSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };



  



  return (
    <div style={{ width:'90vw' ,marginLeft:'5vw'}}>
        추천상품
      <Slider {...settings}>
        <div style={{color:'blue', width:'30vw'}}>
          <h3 style={{color:'blue'}}>1</h3>
        </div>
        <div style={{backgroundColor:'red', width:'30vw'}}>
          <h3>2</h3>
        </div>
        <div style={{backgroundColor:'red', width:'30vw'}}>
          <h3>3</h3>
        </div>
        <div style={{backgroundColor:'red', width:'30vw'}}>
          <h3>4</h3>
        </div>
        <div style={{backgroundColor:'red', width:'30vw'}}>
          <h3>5</h3>
        </div>
        <div style={{backgroundColor:'red', width:'30vw'}}>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default ProductRecommendSlider;
