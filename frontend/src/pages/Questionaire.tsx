import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Questionaire: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dictionary'); 
  };

  return (
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
  );
};


export default Questionaire;