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

















// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, TextField } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// interface Thread {
//   _id: string;
//   title: string;
//   userId: string;
//   replies: { userId: string; name: string; text: string }[];
//   likes: string[];
// }

// const DiscussionForum: React.FC = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const [thread, setThread] = useState<string>('');
//   const [threadList, setThreadList] = useState<Thread[]>([]);

//   useEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       fetchThreads();
//     } else {
//       navigate('/login');
//     }
//   }, [auth, navigate]);

//   const fetchThreads = async () => {
//     try {
//       toast.loading('Loading threads...', { id: 'loadthreads' });
//       const response = await axios.get('http://localhost:3000/api/v1/all/threads', {
//         withCredentials: true,
//       });
//       setThreadList(response.data.threads);
//       toast.success('Threads loaded successfully!', { id: 'loadthreads' });
//     } catch (err) {
//       console.error('Error fetching threads:', err);
//       toast.error('Failed to load threads', { id: 'loadthreads' });
//     }
//   };

//   const createThread = async () => {
//     if (!auth?.user) {
//       return navigate('/login');
//     }
//     console.log(auth);
//     console.log(auth.user);
//     console.log(auth.user.email);
//     try {
//         const response = await axios.post('http://localhost:3000/api/v1/create/thread', {
//         thread,
//         userId: auth.user.email,
//       });
//     //   const response = await axios.post('http://localhost:3000/api/v1/create/thread', {
//     //     thread,
//     //     userId: auth.user.email,
//     //   }, {
//     //     withCredentials: true,
//     //   });
//       toast.success(response.data.message);
//       setThreadList(response.data.threads); // Update the state with the updated list of threads
//       setThread('');
//     } catch (err) {
//       console.error('Error creating thread:', err);
//       toast.error('Failed to create thread');
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     createThread();
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%',
//         height: '100%',
//         mt: 3,
//         gap: 3,
//       }}
//     >
//       <Typography
//         sx={{ textAlign: 'center', fontSize: '40px', color: '#543d7b', mb: 2, mx: 'auto', fontWeight: '600' }}
//       >
//         Discussion Forum
//       </Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', px: 3 }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             //variant="outlined"
//             fullWidth
//             value={thread}
//             onChange={(e) => setThread(e.target.value)}
//             required
//             sx={{ mb: 2 }}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             CREATE THREAD!
//           </Button>
//         </form>
//         <Box
//           sx={{
//             width: '100%',
//             height: '60vh',
//             borderRadius: 3,
//             mt: 3,
//             display: 'flex',
//             flexDirection: 'column',
//             overflowY: 'auto',
//           }}
//         >
//           {threadList.map((thread) => (
//             <Box key={thread._id} sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
//               <Typography variant="h6">{thread.title}</Typography>
//               {/* Add Likes and Comments components here */}
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DiscussionForum;




//OLD CODE WITH ERROR IN CREATING AND FETCHING THREADS


// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, TextField } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// interface Thread {
//   _id: string;
//   title: string;
//   userId: string;
//   replies: { userId: string; name: string; text: string }[];
//   likes: string[];
// }

// const DiscussionForum: React.FC = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const [thread, setThread] = useState<string>('');
//   const [threadList, setThreadList] = useState<Thread[]>([]);

//   useEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       fetchThreads();
//     } else {
//       navigate('/login');
//     }
//   }, [auth, navigate]);

//   const fetchThreads = async () => {
//     try {
//       toast.loading('Loading threads...', { id: 'loadthreads' });
//       const response = await axios.get('/all/threads', {
//         withCredentials: true,
//       });
//       setThreadList(response.data.threads);
//       toast.success('Threads loaded successfully!', { id: 'loadthreads' });
//     } catch (err) {
//       console.error('Error fetching threads:', err);
//       toast.error('Failed to load threads', { id: 'loadthreads' });
//     }
//   };

//   const createThread = async () => {
//     if (!auth?.user) {
//       return navigate('/login');
//     }
//     try {
//       const response = await axios.post('/create/thread', {
//         thread,
//         userId: auth.user.email,
//       });
//       toast.success(response.data.message);
//       setThreadList(response.data.threads); // Update the state with the updated list of threads
//       setThread('');
//     } catch (err) {
//       console.error('Error creating thread:', err);
//       toast.error('Failed to create thread');
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     createThread();
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%',
//         height: '100%',
//         mt: 3,
//         gap: 3,
//       }}
//     >
//       <Typography
//         sx={{ textAlign: 'center', fontSize: '40px', color: '#543d7b', mb: 2, mx: 'auto', fontWeight: '600' }}
//       >
//         Discussion Forum
//       </Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', px: 3 }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             fullWidth
//             value={thread}
//             onChange={(e) => setThread(e.target.value)}
//             required
//             sx={{ mb: 2 }}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             CREATE THREAD!
//           </Button>
//         </form>
//         <Box
//           sx={{
//             width: '100%',
//             height: '60vh',
//             borderRadius: 3,
//             mt: 3,
//             display: 'flex',
//             flexDirection: 'column',
//             overflowY: 'auto',
//           }}
//         >
//           {threadList.map((thread) => (
//             <Box key={thread._id} sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
//               <Typography variant="h6">{thread.title}</Typography>
//               {/* Add Likes and Comments components here */}
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DiscussionForum;




//new code (my version):

import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { createThread, getAllThreads } from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Thread = {
  title: string;
  id: string;
};

const DiscussionForum = () => {
  const auth = useAuth();
  const [thread, setThread] = useState("");
  const [threadList, setThreadList] = useState<Thread[]>([]);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Threads", { id: "loadthreads" });
      getAllThreads()
        .then((data) => {
          setThreadList(data.threads);
          toast.success("Successfully loaded threads", { id: "loadthreads" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading threads failed", { id: "loadthreads" });
        });
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userName = auth?.user?.name;
      if (userName) {
        await createThread(thread, userName);
        setThreadList((prevThreads) => [...prevThreads, { title: thread, id: "new_id" }]);
        setThread("");
        toast.success("Thread created successfully");
      } else {
        toast.error("User name not found");
      }
    } catch (error) {
      console.error("Failed to create thread:", error);
      toast.error("Failed to create thread");
    }
  };

  return (
    <>
			<main className='home'>
				<h2 className='homeTitle'>Create a Thread!</h2>
				<form className='homeForm' onSubmit={handleSubmit}>
					<div className='home__container'>
						<label htmlFor='thread'>Title </label>
						<input
							type='text'
							name='thread'
							required
							value={thread}
							onChange={(e) => setThread(e.target.value)}
						/>
					</div>
					<button className='homeBtn'>CREATE</button>
				</form>

				<div className='thread__container'>
					{threadList.map((thread) => (
						<div className='thread__item' key={thread.id}>
							<p>{thread.title}</p>
							<div className='react__container'>
								{/* <Likes
									numberOfLikes={thread.likes.length}
									threadId={thread.id}
								/>
								<Comments
									numberOfComments={thread.replies.length}
									threadId={thread.id}
									title={thread.title}
								/> */}
							</div>
						</div>
					))}
				</div>
			</main>
		</>
  );
};

export default DiscussionForum;
