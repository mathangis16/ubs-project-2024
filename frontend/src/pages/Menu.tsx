import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const images = [
  {
    src: 'chatbot_2.png',
    title: 'Chatbot',
    width: '30%', // Adjust width for better alignment
    link: '/chat',
  },
  {
    src: 'discussion_forum_2.png',
    title: 'Discussion Forum',
    width: '30%', // Adjust width for better alignment
    link: '/forumUser',
  },
  {
    src: 'questionaire_2.jpeg',
    title: 'Questionaire',
    width: '30%', // Adjust width for better alignment
    link: '/questionaire',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 270,
//   border: '1px solid black', // Add black border
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Box width={"100%"} height={"100%"} sx={{ textAlign: 'center', marginBottom: '100px', padding: '0px 10px' }}>
      <Box><h2 style={{ fontSize: '50px', marginTop: '20px', marginBottom:'20px' }}>Let's Explore!</h2></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //gap: 2, // Add spacing between buttons
          marginRight:"20px",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {images.slice(0, 2).map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
              onClick={() => navigate(image.link)} // Add navigation on click
            >
              <ImageSrc style={{ backgroundImage: `url(${image.src})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  fontSize={'50px'}
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {images.slice(2, 3).map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
              onClick={() => navigate(image.link)} // Add navigation on click
            >
              <ImageSrc style={{ backgroundImage: `url(${image.src})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  fontSize={'50px'}
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
