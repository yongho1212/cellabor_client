import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './home.css'
import Section from '../../Section';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';

import Box from '../../../useScrollFadeIn'

const Home = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();

  const observer = new IntersectionObserver(() => {})

  // const sectionStyle = {
  //   width: "100%",
  //   backgroundImage: "url(" + { background } + ")"
  // };

  return (
    <>
      <div className="home_page">
        {/* <div style={{ height: '100vh', backgroundImage: `url(${background})`, backgroundSize: "cover" }} >
        </div> */}
        {/* <Section {...homeObjOne} />
        <Section {...homeObjThree} />
        <Section {...homeObjTwo} /> */}
        <Box num={1} />
        <Box num={2} />
        <Box num={3} />
      </div>
    </>
  );
};

export default Home;
