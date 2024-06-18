// import React from "react";

// const DiscussionForum = () => {
//     const handleButtonClick = () => {
//         window.location.href = 'http://localhost:4000'; 
//     };// URL of the React application
//     return (
//     <div> 
//         <h1>Click here to go to the discussion forum!</h1>
//       <button onClick={handleButtonClick}>Go to React App</button>
//     </div>);
// };

// export default DiscussionForum;

// import React from "react";

// const DiscussionForum = () => {
//     return <div> Discussion forum </div>;
// };

// export default DiscussionForum;



import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface Thread {
  _id: string;
  title: string;
  userId: string;
  replies: { userId: string; name: string; text: string }[];
  likes: string[];
}

const DiscussionForum: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [thread, setThread] = useState<string>('');
  const [threadList, setThreadList] = useState<Thread[]>([]);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      fetchThreads();
    } else {
      navigate('/login');
    }
  }, [auth, navigate]);

  const fetchThreads = async () => {
    try {
      toast.loading('Loading threads...', { id: 'loadthreads' });
      const response = await axios.get('http://localhost:3000/api/v1/all/threads', {
        withCredentials: true,
      });
      setThreadList(response.data.threads);
      toast.success('Threads loaded successfully!', { id: 'loadthreads' });
    } catch (err) {
      console.error('Error fetching threads:', err);
      toast.error('Failed to load threads', { id: 'loadthreads' });
    }
  };

  const createThread = async () => {
    if (!auth?.user) {
      return navigate('/login');
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/create/thread', {
        thread,
        userId: auth.user._id,
      }, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setThreadList(response.data.threads); // Update the state with the updated list of threads
      setThread('');
    } catch (err) {
      console.error('Error creating thread:', err);
      toast.error('Failed to create thread');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createThread();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Typography
        sx={{ textAlign: 'center', fontSize: '40px', color: '#543d7b', mb: 2, mx: 'auto', fontWeight: '600' }}
      >
        Discussion Forum
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', px: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            //variant="outlined"
            fullWidth
            value={thread}
            onChange={(e) => setThread(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            CREATE THREAD!
          </Button>
        </form>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {threadList.map((thread) => (
            <Box key={thread._id} sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <Typography variant="h6">{thread.title}</Typography>
              {/* Add Likes and Comments components here */}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DiscussionForum;
