import React from "react";
import { Box, Typography, Button } from '@mui/material';

const BeforeQuestions = () => {
    return(
        <Box width={"100%"} height={"100%"}>
            <Typography variant="h3" style={{ color: "black", paddingTop:'50px', textAlign:'center' }} gutterBottom>
            Welcome to Tobias! First let's test your knowledge!
            </Typography>
            <Typography variant="h5" style={{ color: "black", paddingTop:'20px', paddingBottom:'20px', textAlign:'center' }} gutterBottom> Answer these 10 custom made questions and see your score at the end!</Typography>
        </Box>
    );
};

export default BeforeQuestions;