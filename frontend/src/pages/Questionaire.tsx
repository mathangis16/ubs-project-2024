import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
//import {getAllUsers} from "./controllers/user-controllers";
import { useAuth } from "../context/AuthContext";
import "Gender Questionnaire - with flags.json";

// interface Data {
//   [key: string]: string;
// }

const Questionaire: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dictionary'); 
  };

  const auth = useAuth();
  // const data: Data = {
  // }

  return (
    <Box width={"100%"} height={"100%"}>
      <Box><h3 style={{ fontSize: '50px' }}>Let's see your knowledge!</h3></Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        Learn more!
      </Button>
    </Box>
  );
};


export default Questionaire;