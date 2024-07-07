// import { Box, useMediaQuery, useTheme, Typography, Button } from "@mui/material";
// import React from "react";
// import TypingAnim from "../components/typer/TypingAnim";
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const theme = useTheme();
//   const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/login'); 
//   };
//   return (
//     <Box width={"100%"} height={"100%"}>
//       <Box
//         sx={{
//           display: "flex",
//           width: "100%",
//           flexDirection: "column",
//           alignItems: "center",
//           mx: "auto",
//           mt: 3,
//         }}
//       >
//         <Box>
//           <TypingAnim />
//         </Box>
//         <Box><h1 style={{ textAlign: 'center', fontSize:'50px',marginBottom:'0px', fontStyle:'oblique' }}> Tobias </h1></Box>
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             flexDirection: { md: "row", xs: "column", sm: "column" },
//             gap: 5,
//             //my: 10,
//           }}
//         >
//         </Box>
//         <Box>
//           <img className="diversity"
//             src="image_people_final.png"
//             alt="diversity"
//             style={{backgroundAttachment: "fixed", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></img>
//         </Box>
//         <Box><h1 style={{ textAlign: 'center', marginLeft:'40px',marginBottom:'10px', paddingLeft:'100px', paddingRight:'100px', paddingTop: '40px', paddingBottom: '40px' }}>Diversity, equity, inclusion and belonging (DEIB) make up a framework designed to create a workplace that is fair and welcoming to employees of various backgrounds.</h1></Box>
//         <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         marginTop="0px"
//       >
//       <Box mx={2}>
//         <img src="hands_small.png" alt="hands" style={{ width: '400px', height: 'auto', paddingLeft: '10px'}} />
//       </Box>
//       <Box mx={2}>
//         <p style={{ fontSize:'22px', padding: '40px', paddingRight: '50px', paddingLeft: '0px' }}>Over the last few decades, the world has taken significant strides in ensuring equality, women empowerment etc. 
//           Although we should appreciate the progress made, it is important that we acknowledge that people still face issues in this space. 
//           The problem lies in the fact that not many people are confident enough to seek support, help or dont think its a problem that is worth escalating. 
//           Furthermore, people might notice other people being victims of gender bias / inequality but do not feel the need to take action on it since they are not the ones on the receiving end. 
//           The problem lies in the fact that there is no platform / product that people can use where they can learn, track, escalate (anonymously or not) and seek moral support in situations that might arise.
//           To tackle all this we have Tobias!</p>
//         {/* <p style={{ fontSize:'22px', padding: '20px' }}>To tackle all this we have Tobias</p> */}
//       </Box>
//       </Box>
//       <Box><Button
//             variant="contained"
//             color="primary"
//             onClick={handleClick}
//             sx={{
//               px: 2,
//               py: 1,
//               mt: 2,
//               borderRadius: 2,
//               marginBottom:2,
//               marginTop:0,
//               fontSize:'30px',
//               backgroundColor:'#543d7b',
//               color:'#fff8ed'
//             }}
//           >
//             Let's Explore!
//         </Button></Box>
//         {/*<Box sx={{ display: "flex", mx: "auto", position: "absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", mixBlendMode:"screen"}}>
//             <img
//             className="moon"
//             src="moon.png"
//             alt="moon"
//         />
//         </Box>
//         <Box sx={{ display: "flex", mx: "auto", position: "absolute", top:0, left:0, width:"100%", height:"100%" }}>
//             <img
//             className="mountains_behind"
//             src="mountains_behind.png"
//             alt="mountains_behind"
//             style={{ objectFit:"cover", margin: "auto" }}
//         />
//         </Box>
//         <Box>
//             <Typography sx={{ display: "flex", justifyContent:"center", alignItems:"center", position:"absolute" }}> Tobias </Typography>
//         </Box>
//         <Box sx={{ display: "flex", mx: "auto", position: "absolute", top:0, left:0, width:"100%", height:"100%" }}>
//             <img
//             className="mountains_front"
//             src="mountains_front.png"
//             alt="mountains_front"
//             style={{ objectFit: "cover", margin:"auto" }}
//         />
//         </Box>
// */}
//       </Box>
//     </Box>
//   );
// };

// export default Home;





import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export const TextParallaxContentExample = () => {
  return (
    <div style={{ backgroundColor: "#f3eee9" }}>
      <TextParallaxContent
        imgUrl="image_people_final.png"
        subheading="To understand, minimize and uncover bias"
        heading="︾"
      >
        <ExampleContent />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 0;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div style={{ position: "relative", height: "150vh" }}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
        position: "sticky",
        overflow: "hidden",
        zIndex: 0,
      }}
      ref={targetRef}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        y,
        opacity,
      }}
      ref={targetRef}
    >
      <p style={{ marginBottom: "0.5rem", textAlign: "center", fontSize: "4.20rem", fontFamily: "Space Grotesk" }}>
        {subheading}
      </p>
      <p style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold" }}>
        {heading}
      </p>
    </motion.div>
  );
};

const ExampleContent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); 
  };

  return (
    <div style={{
      maxWidth: "1280px",
      padding: "3rem 1rem 6rem 1rem",
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: "2rem",
    }}>
      <div style={{ gridColumn: "span 7" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "left",
          marginLeft: "30px"
        }}>
          Diversity, equity, inclusion and belonging (DEIB) make up a framework designed to create a workplace that is fair and welcoming to employees of various backgrounds.
        </h2>
        <p style={{
          marginBottom: "1rem",
          fontSize: "1.25rem",
          color: "black",
          //color : "#5C4F9F",
          marginLeft: "30px",
          marginTop: "1rem"
        }}>
          Although we should appreciate the progress made, it is important that we acknowledge that people still face issues in this space. 
          The problem lies in the fact that not many people are confident enough to seek support, help or don't think it's a problem that is worth escalating. 
          Furthermore, people might notice other people being victims of gender bias / inequality but do not feel the need to take action on it since they are not the ones on the receiving end. 
          The problem lies in the fact that there is no platform / product that people can use where they can learn, track, escalate (anonymously or not) and seek moral support in situations that might arise.
        </p>
        <p style={{
          marginBottom: "2rem",
          fontSize: "1.25rem",
          //color: "#5C4F9F",
          color: "black",
          marginLeft: "30px"
        }}>
          To tackle all this we have Tobias!
        </p>
        <button 
          onClick={handleClick}
          style={{
            width: "100%",
            backgroundColor: "#111827",
            //backgroundColor: "#855AAF",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "0.5rem",
            fontSize: "1.25rem",
            transition: "background-color 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "30px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#002a56";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#111827";
            // e.currentTarget.style.backgroundColor = "#855AAF";
          }}
        >
          Let's Explore <FiArrowUpRight style={{ marginLeft: "0.5rem" }} />
        </button>
      </div>
      <div style={{ gridColumn: "span 5" }}>
        <img 
          src="login_bg.jpg" 
          alt="People" 
          style={{ width: "140%", marginLeft: "8px", marginRight: "250px", marginTop: "30px", height:"auto" }}
        />
      </div>
    </div>
  );
};

export default TextParallaxContentExample;








// import { Box, useMediaQuery, useTheme, Typography, Button } from "@mui/material";
// import React, { ReactNode, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { FiArrowUpRight } from "react-icons/fi";
// import TypingAnim from "../components/typer/TypingAnim";
// import { useNavigate } from 'react-router-dom';


// const Home = () => {
//   return (
//     <div className="bg-white">
//       <TypingAnim />
//       <h1 style={{ textAlign: 'center', fontSize:'50px',marginBottom:'0px', fontStyle:'oblique' }}> Tobias </h1>
//       <TextParallaxContent
//         imgUrl="image_people_final.png"
//         subheading="Collaborate"
//         heading="Built for all of us."
//       >
//         <ExampleContent />
//       </TextParallaxContent>
//     </div>
//   );
// };

// const IMG_PADDING = 12;

// const TextParallaxContent = ({
//   imgUrl,
//   subheading,
//   heading,
//   children,
// }: {
//   imgUrl: string;
//   subheading: string;
//   heading: string;
//   children: ReactNode;
// }) => {
//   return (
//     <div
//       style={{
//         paddingLeft: IMG_PADDING,
//         paddingRight: IMG_PADDING,
//       }}
//     >
//       <div className="relative h-[150vh]">
//         <StickyImage imgUrl={imgUrl} />
//         <OverlayCopy heading={heading} subheading={subheading} />
//       </div>
//       {children}
//     </div>
//   );
// };

// const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["end end", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

//   return (
//     <motion.div
//       style={{
//         backgroundImage: `url(${imgUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: `calc(100vh - ${IMG_PADDING * 2}px)`,
//         top: IMG_PADDING,
//         scale,
//       }}
//       ref={targetRef}
//       className="sticky z-0 overflow-hidden rounded-3xl"
//     >
//       <motion.div
//         className="absolute inset-0 bg-neutral-950/70"
//         style={{
//           opacity,
//         }}
//       />
//     </motion.div>
//   );
// };

// const OverlayCopy = ({
//   subheading,
//   heading,
// }: {
//   subheading: string;
//   heading: string;
// }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
//   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

//   return (
//     <motion.div
//       style={{
//         y,
//         opacity,
//       }}
//       ref={targetRef}
//       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
//     >
//       <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
//         {subheading}
//       </p>
//       <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
//     </motion.div>
//   );
// };

// const ExampleContent = () => (
//   <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
//     <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
//       Additional content explaining the above card here
//     </h2>
//     <div className="col-span-1 md:col-span-8">
//       <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
//         blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
//         maiores voluptate est ut saepe accusantium maxime doloremque nulla
//         consectetur possimus.
//       </p>
//       <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
//         reiciendis blanditiis aliquam aut fugit sint.
//         eiohwfoehfmwdifvmwfvenikrdewnciwr
//         vrdwruvmnwudycwpmnrvcwwq
//         crmwuvhpwdeorimqwp4echmvpehdcv
//         rifnreiufhmnref
//         eiohwfoehfmwdifvmwfvenikrdewnciwr
//         vrdwruvmnwudycwpmnrvcwwq
//         crmwuvhpwdeorimqwp4echmvpehdcveiohwfoehfmwdifvmwfvenikrdewnciwr
//         vrdwruvmnwudycwpmnrvcwwq
//         crmwuvhpwdeorimqwp4echmvpehdcv
//       </p>
//       <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
//         Learn more <FiArrowUpRight className="inline" />
//       </button>
//     </div>
//   </div>
// );

// export default Home;












