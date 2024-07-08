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










//new code (my version): WORKING VERSION

import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { createThread, getAllThreads } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

type Thread = {
  title: string;
  id: string;
};

const DiscussionForum = () => {
  const auth = useAuth();
  const [thread, setThread] = useState("");
  const [threadList, setThreadList] = useState<Thread[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
      navigate('/ViewReplies'); 
  };

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
        // setThreadList((prevThreads) => [...prevThreads, { title: thread, id: "new_id" }]);
        setThreadList((prevThreads) => [{ title: thread, id: "new_id" }, ...prevThreads]);
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
        <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{
                        px: 2,
                        //py: 1,
                        borderRadius: 2,
                        fontSize:'20px',
                        //backgroundColor:'#30448c',
                        backgroundColor:"#51538f",
                        color:'#fff8ed',
                        width: '300px'
                    }}
                >
                    View replies
        </Button>
        {/* <PopupButton
        url="https://calendly.com/mathangis16"
        //@ts-ignore
        rootElement={document.getElementById("root")}
        text="Click here to schedule an event!"
        styles={{
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#51538f',
          color: 'white',
          padding: '10px 20px',
          fontSize: '20px',
          cursor: 'pointer',
        }}
      /> */}
			</main>
		</>
  );
};

export default DiscussionForum;






// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getAllThreads, createReply, getAllReplies, likeThread } from "../helpers/api-communicator";
// import toast from "react-hot-toast";
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// type Reply = {
//   content: string;
//   user: { name: string }; // Assuming user has a name property
// };

// type Thread = {
//   title: string;
//   id: string;
//   replies: Reply[];
//   likes: { user: string }[]; // Assuming likes is an array of user IDs
// };

// const DiscussionForum = () => {
//   const auth = useAuth();
//   const [threadList, setThreadList] = useState<Thread[]>([]);
//   const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
//   const [reply, setReply] = useState("");
//   const [numberOfLikes, setNumberOfLikes] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Threads", { id: "loadthreads" });
//       getAllThreads()
//         .then((data) => {
//           setThreadList(data.threads);
//           const likesCount: { [key: string]: number } = {};
//           //@ts-ignore
//           data.threads.forEach(thread => {
//             likesCount[thread.id] = thread.likes.length;
//           });
//           setNumberOfLikes(likesCount);
//           toast.success("Successfully loaded threads", { id: "loadthreads" });
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error("Loading threads failed", { id: "loadthreads" });
//         });
//     }
//   }, [auth]);

//   const handleAddReply = async (e: React.FormEvent<HTMLFormElement>, threadId: string) => {
//     e.preventDefault();
//     if (!reply) return;
//     try {
//       const userName = auth?.user?.name;
//       if (userName) {
//         await createReply(threadId, reply, userName);
//         // const updatedReplies = await getAllReplies(threadId);
//         // setThreadList((prevThreads) =>
//         //   prevThreads.map((thread) =>
//         //     thread.id === threadId ? { ...thread, replies: updatedReplies.replies } : thread
//         //   )
//         // );
//         // setReply("");
//         // toast.success("Reply added successfully");
//       } else {
//         toast.error("User name not found");
//       }
//     } catch (error) {
//       console.error("Failed to get reply:", error);
//       toast.error("Failed to get reply");
//     }
//   };


//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/chat'); 
//   };

//   return (
//     <main className="forum">
//       <h2 className="forum-title">Share your thoughts!</h2>
//       <div className="forum-container">
//         {threadList.map((thread) => (
//           <div className="forum-thread" key={thread.id}>
//             <div className="thread-title">
//               <h3>{thread.title}</h3>
//               <div className="thread-actions">
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-6 h-6 commentsBtn"
//                     onClick={() => setSelectedThreadId(thread.id)}
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <p style={{ color: "#434242" }}>{thread.replies.length}</p>
//                 </div>
//               </div>
//             </div>
//             {selectedThreadId === thread.id && (
//               <>
//                 <div className="replies-container">
//                   {thread.replies.map((reply, index) => (
//                     <div className="reply-item" key={index}>
//                       <p>{reply.content}</p>
//                       <p className="reply-user">by {reply.user.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleClick}
//         sx={{
//           px: 2,
//           py: 1,
//           mt: 2,
//           borderRadius: 2,
//           marginBottom: 2,
//           backgroundColor: '#f99417',
//           color: '#fff8ed',
//           position: 'fixed',
//           bottom: '35px',
//           right: '30px',
//           display: 'flex',
//           alignItems: 'center',
//         }}
//         startIcon={<img src={"chatbot_icon.png"} alt="Chatbot" style={{ width: '40px' }} />}
//       />
//     </main>
//   );
// };

// export default DiscussionForum;
