import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './home.css'
import Section from '../../Section';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import background from "../../../adboard.jpg"

const Home = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();

  const sectionStyle = {
    width: "100%",
    backgroundImage: "url(" + { background } + ")"
  };

  return (
    <>
      <div className="home_page">
        <div style={{ height: '100vh', backgroundImage: `url(${background})`, backgroundSize: "cover" }} >
          
        </div>
        <Section {...homeObjOne} />
        <Section {...homeObjThree} />
        <Section {...homeObjTwo} />
      </div>
    </>
  );
};

export default Home;
