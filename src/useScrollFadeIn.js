import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import "./useScrollFadeIn.css";

const boxVariant = {
  visible: {
    x: 100,
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.6, ease: "easeOut" },
  },
  hidden: { x: -200, y: -40, opacity: 0 },
};

const boxVariantRight = {
  visibleRight: {
    x: 170,
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.4, ease: [0, 0.71, 0.2, 1.01] },
  },
  hiddenRight: {
    opacity: 0,
  },
};

const Box = ({
  num,
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
}) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
      control.start("visibleRight");
    } else {
      control.start("hidden");
      control.start("hiddenRight");
    }
  }, [control, inView]);

  //   useEffect(() => {
  //     if (inView) {
  //       control.start("visibleRight");
  //     } else {
  //       control.start("hiddenRight");
  //     }
  //   }, [control, inView]);

  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <motion.div
        className="box"
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}
      >
        <div className="homeContentsContainer">
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <div>
                  <div>{topLine}</div>
                  <h1>{headline}</h1>
                  <p>{description}</p>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="box"
        ref={ref}
        variants={boxVariantRight}
        initial="hiddenRight"
        animate={control}
      >
        <div className="rightsideContainer"> 
        <img src={img} alt={alt} style={{width:'300px'}} />
        </div>
      </motion.div>
    </div>
  );
};

export default Box;
