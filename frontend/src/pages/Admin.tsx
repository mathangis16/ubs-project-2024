import React from "react";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PopupButton } from "react-calendly";

const Admin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/DiscussionForum'); 
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
            }}
        >
            <Typography variant="h2" style={{ color: "black", paddingLeft: '180px', paddingTop: '0px' }} gutterBottom>
                Welcome back Admin! 
            </Typography>
            <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2} gap={2} sx={{ paddingLeft: '90px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{
                        px: 2,
                        //py: 1,
                        borderRadius: 2,
                        fontSize:'20px',
                        backgroundColor:'#30448c',
                        color:'#fff8ed',
                        width: '300px'
                    }}
                >
                    Create threads!
                </Button>
                <PopupButton
                    url="https://calendly.com/mathangis16"
                    //@ts-ignore
                    rootElement={document.getElementById("root")}
                    text="SCHEDULE DIVERSITY AND INCLUSION EVENTS"
                    styles={{
                        border: 'none',
                        borderRadius: '7px',
                        backgroundColor: '#51538f',
                        color: 'white',
                        padding: '10px 20px',
                        fontSize: '20px',
                        cursor: 'pointer',
                        width: '500px',
                    }}
                />
            </Box>
        </Box>
    );
};

export default Admin;

