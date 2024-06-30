import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box><h1 style={{ textAlign: 'center', fontSize:'50px',marginBottom:'0px' }}> Tobias </h1></Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            //my: 10,
          }}
        >
          { /* <img
            src="robot.png"
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
        /> */}
          { /* <img
            className="image-inverted rotate"    //here rotate specifications are given in index.css
            src="openai.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
    /> */}
        {/* <img
            className="star"
            src="stars.png"
            alt="star"
            //style={{ width: "200px", margin: "auto" }}
    /> */}
        </Box>
        <Box>
          <img className="diversity"
            src="image_people_final.png"
            alt="diversity"
            style={{backgroundAttachment: "fixed", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></img>
        </Box>
        <Box><h1 style={{ textAlign: 'center', marginLeft:'40px',marginBottom:'10px', paddingLeft:'100px', paddingRight:'100px', paddingTop: '40px', paddingBottom: '40px' }}>Diversity, equity, inclusion and belonging (DEIB) make up a framework designed to create a workplace that is fair and welcoming to employees of various backgrounds.</h1></Box>
        {/* <Box sx={{display:"flex", justifyContent:"flex-start"}}> 
        <img className="tobias"
            src="tobias.jpeg"
            alt="tobias"
            width='80px'
            ></img>
        </Box>
        <Box><p>Over the last few decades, the world has taken significant strides in ensuring equality, women empowerment etc. 
          Although we should appreciate the progress made, it is important that we acknowledge that people still face issues in this space. 
          The problem lies in the fact that not many people are confident enough to seek support, help or dont think its a problem that is worth escalating. 
          Furthermore, people might notice other people being victims of gender bias / inequality but do not feel the need to take action on it since they are not the ones on the receiving end. 
          The problem lies in the fact that there is no platform / product that people can use where they can learn, track, escalate (anonymously or not) and seek moral support in situations that might arise. 
          To tackle all this we have Tobias</p></Box> */}
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="0px"
      >
      <Box mx={2}>
        <img src="hands_small.png" alt="hands" style={{ width: '400px', height: 'auto'}} />
      </Box>
      <Box mx={2}>
        <p style={{ fontSize:'22px', padding: '40px', paddingRight: '50px', paddingLeft: '0px' }}>Over the last few decades, the world has taken significant strides in ensuring equality, women empowerment etc. 
          Although we should appreciate the progress made, it is important that we acknowledge that people still face issues in this space. 
          The problem lies in the fact that not many people are confident enough to seek support, help or dont think its a problem that is worth escalating. 
          Furthermore, people might notice other people being victims of gender bias / inequality but do not feel the need to take action on it since they are not the ones on the receiving end. 
          The problem lies in the fact that there is no platform / product that people can use where they can learn, track, escalate (anonymously or not) and seek moral support in situations that might arise.</p>
        <p style={{ fontSize:'22px', padding: '20px' }}>To tackle all this we have Tobias</p>
      </Box>
      </Box>
        {/*<Box sx={{ display: "flex", mx: "auto", position: "absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", mixBlendMode:"screen"}}>
            <img
            className="moon"
            src="moon.png"
            alt="moon"
        />
        </Box>
        <Box sx={{ display: "flex", mx: "auto", position: "absolute", top:0, left:0, width:"100%", height:"100%" }}>
            <img
            className="mountains_behind"
            src="mountains_behind.png"
            alt="mountains_behind"
            style={{ objectFit:"cover", margin: "auto" }}
        />
        </Box>
        <Box>
            <Typography sx={{ display: "flex", justifyContent:"center", alignItems:"center", position:"absolute" }}> Tobias </Typography>
        </Box>
        <Box sx={{ display: "flex", mx: "auto", position: "absolute", top:0, left:0, width:"100%", height:"100%" }}>
            <img
            className="mountains_front"
            src="mountains_front.png"
            alt="mountains_front"
            style={{ objectFit: "cover", margin:"auto" }}
        />
        </Box>
*/}
      </Box>
    </Box>
  );
};

export default Home;