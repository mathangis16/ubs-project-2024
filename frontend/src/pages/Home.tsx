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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
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
        <img
            className="star"
            src="stars.png"
            alt="stars"
            //style={{ width: "200px", margin: "auto" }}
    />
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