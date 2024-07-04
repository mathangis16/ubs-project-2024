import React from "react";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeforeQuestions = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/questionaire'); 
    };
    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            style={{
                backgroundImage: `url('before_qns.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                padding: '20px',
                textAlign: 'left' // Ensure the text is aligned to the left
            }}
        >
            <Typography variant="h2" style={{ color: "black", paddingLeft: '170px' }} gutterBottom>
                Welcome to Tobias! 
            </Typography>
            <Typography variant="h3" style={{ color: "black", paddingLeft: '40px' }} gutterBottom>
                But first let's test your knowledge!
            </Typography>
            <Typography variant="h5" style={{ color: "black", paddingTop: '20px', paddingLeft: '30px' }} gutterBottom> 
                Answer these 10 custom made questions and see your score at the end!
            </Typography>
            <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={{
              px: 2,
              py: 1,
              //mt: 2,
              borderRadius: 2,
              marginBottom:2,
              fontSize:'20px',
              backgroundColor:'#30448c',
              color:'#fff8ed',
              position:'fixed',
              bottom: '85px',
              left: "430px",
            }}
          >
            Start 
        </Button>
        </Box>
    );
};

export default BeforeQuestions;

