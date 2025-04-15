import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CSS/HeroSection.css";
import { Link } from "react-router-dom";

const CustomDot = ({ onClick, active }) => {
  const dotStyles = {
    backgroundColor: active ? "#047857" : "#A2D5D7",
    width: "20px",
    height: "5px",
    margin: "0 5px",
    borderRadius: "2px",
    cursor: "pointer",
  };

  return <span style={dotStyles} onClick={onClick} />;
};

const HeroSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("http://localhost:4000/api/v1/post/getposts", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setPosts([...posts, ...data?.posts]);
    };
    fetchPost();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="w-full h-[25rem] sm:h-[35rem] md:h-[50rem] relative mx-6 sm:mx-0">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay={true}
        autoPlaySpeed={1000}
        centerMode={false}
        draggable
        focusOnSelect={false}
        infinite={true}
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        responsive={responsive}
        rewind={true}
        rewindWithAnimation={true}
        rtl={false}
        shouldResetAutoplay
        showDots={true}
        renderDotsOutside={true}
        slidesToSlide={1}
        swipeable
        className=""
        sliderClass=""
        customTransition="transform 1000ms ease 500ms"
        transitionDuration={2000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="container-with-dots" // it is applied on the div containing the list(ul) of carousel items
        itemClass="carousel-custom-item" // it is applied on individual curousel item (list item (li)) it contains your image
        dotListClass="custom-dot-list-style" // it is applied on the dots list not on individual dots
        customDot={<CustomDot />}
        // customNextArrow={<CustomNextArrow />}
        // customPrevArrow={<CustomPrevArrow />}
      >
        {posts.map((post, index) => (
          <div key={index}>
            <Link to={`/post/${post.slug}`}>
              <img src={post.image} className="w-full rounded-lg" />
              <h1 className="text-center text-lg font-serif mt-3">
                {post.title}
              </h1>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
