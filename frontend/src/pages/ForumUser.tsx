// import React, { useEffect, useState } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { IoMdSend } from "react-icons/io";
// import { useAuth } from "../context/AuthContext";
// import { getAllThreads, createReply, getAllReplies } from "../helpers/api-communicator";
// import toast from "react-hot-toast";

// type Thread = {
//   title: string;
//   id: string;
//   replies: Array<{ content: string; user: string }>;
// };

// const ForumUser = () => {
//   const auth = useAuth();
//   const [threadList, setThreadList] = useState<Thread[]>([]);
//   const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
//   const [reply, setReply] = useState("");

//   useEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Threads", { id: "loadthreads" });
//       getAllThreads()
//         .then((data) => {
//           setThreadList(data.threads);
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
//         const updatedReplies = await getAllReplies(threadId);
//         setThreadList((prevThreads) =>
//           prevThreads.map((thread) =>
//             thread.id === threadId ? { ...thread, replies: updatedReplies.replies } : thread
//           )
//         );
//         setReply("");
//         toast.success("Reply added successfully");
//       } else {
//         toast.error("User name not found");
//       }
//     } catch (error) {
//       console.error("Failed to add reply:", error);
//       toast.error("Failed to add reply");
//     }
//   };

//   return (
//     <main className="home">
//       <h2 className="homeTitle">Reply to a Thread!</h2>
//       <div className="thread__container">
//         {threadList.map((thread) => (
//           <div className="thread__item" key={thread.id}>
//             <p>{thread.title}</p>
//             <div className="react__container">
//               <div className="comments__container">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="w-6 h-6 commentsBtn"
//                   onClick={() => setSelectedThreadId(thread.id)}
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <p style={{ color: "#434242" }}>{thread.replies.length}</p>
//               </div>
//             </div>
//             {selectedThreadId === thread.id && (
//               <div className="reply__section">
//                 <form onSubmit={(e) => handleAddReply(e, thread.id)}>
//                   <label htmlFor="reply">Reply to the thread</label>
//                   <textarea
//                     rows={5}
//                     value={reply}
//                     onChange={(e) => setReply(e.target.value)}
//                     //@ts-ignore
//                     type="text"
//                     name="reply"
//                     className="modalInput"
//                   />
//                   <button className="modalBtn">SEND</button>
//                 </form>
//                 <div className="thread__container">
//                   {thread.replies.map((reply, index) => (
//                     <div className="thread__item" key={index}>
//                       <p>{reply.content}</p>
//                       <div className="react__container">
//                         <p style={{ opacity: "0.5" }}>by {reply.user}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default ForumUser;


import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllThreads, createReply, getAllReplies, likeThread } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Reply = {
  content: string;
  user: { name: string }; // Assuming user has a name property
};

type Thread = {
  title: string;
  id: string;
  replies: Reply[];
  likes: { user: string }[]; // Assuming likes is an array of user IDs
};

const ForumUser = () => {
  const auth = useAuth();
  const [threadList, setThreadList] = useState<Thread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Threads", { id: "loadthreads" });
      getAllThreads()
        .then((data) => {
          setThreadList(data.threads);
          const likesCount: { [key: string]: number } = {};
          //@ts-ignore
          data.threads.forEach(thread => {
            likesCount[thread.id] = thread.likes.length;
          });
          setNumberOfLikes(likesCount);
          toast.success("Successfully loaded threads", { id: "loadthreads" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading threads failed", { id: "loadthreads" });
        });
    }
  }, [auth]);

  const handleAddReply = async (e: React.FormEvent<HTMLFormElement>, threadId: string) => {
    e.preventDefault();
    if (!reply) return;
    try {
      const userName = auth?.user?.name;
      if (userName) {
        await createReply(threadId, reply, userName);
        const updatedReplies = await getAllReplies(threadId);
        setThreadList((prevThreads) =>
          prevThreads.map((thread) =>
            thread.id === threadId ? { ...thread, replies: updatedReplies.replies } : thread
          )
        );
        setReply("");
        toast.success("Reply added successfully");
      } else {
        toast.error("User name not found");
      }
    } catch (error) {
      console.error("Failed to add reply:", error);
      toast.error("Failed to add reply");
    }
  };

  const handleLikeThread = async (threadId: string) => {
    try {
      const username = auth?.user?.name;
      if (username) {
        // const response = await likeThread(threadId, username);
        setThreadList((prevThreads) =>
          prevThreads.map((thread) =>
            thread.id === threadId ? { ...thread, likes: [...thread.likes, { user: username }] } : thread
          )
        );
        setNumberOfLikes(prevLikes => ({
          ...prevLikes,
          [threadId]: (prevLikes[threadId] || 0) + 1
        }));
        toast.success("Thread liked successfully");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Failed to like thread:", error);
      toast.error("Failed to like thread");
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chat'); 
  };

  return (
    <main className="forum">
      <h2 className="forum-title">Share your thoughts!</h2>
      <div className="forum-container">
        {threadList.map((thread) => (
          <div className="forum-thread" key={thread.id}>
            <div className="thread-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{thread.title}</h3>
              <div className="thread-actions" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 commentsBtn"
                    onClick={() => setSelectedThreadId(thread.id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p style={{ color: "#434242", marginLeft: '8px' }}>{thread.replies.length}</p>
                </div>
                <div className='likes__container' style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleLikeThread(thread.id)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-4 h-4 likesBtn'
                  >
                    <path d='M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z' />
                  </svg>
                  <p style={{ color: "#434242", marginLeft: '8px' }}>
                    {numberOfLikes[thread.id] === 0 ? "" : numberOfLikes[thread.id]}
                  </p>
                </div>
              </div>
            </div>
            {selectedThreadId === thread.id && (
              <>
                <form className="reply-form" onSubmit={(e) => handleAddReply(e, thread.id)}>
                  <label htmlFor="reply">Enter reply here</label>
                  <textarea
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    //@ts-ignore
                    type="text"
                    name="reply"
                    className="reply-input"
                  />
                  <button type="submit" className="reply-button">SEND</button>
                </form>
                <div className="replies-container">
                  {thread.replies.map((reply, index) => (
                    <div className="reply-item" key={index}>
                      <p>{reply.content}</p>
                      <p className="reply-user">by {reply.user.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          borderRadius: 2,
          marginBottom: 2,
          backgroundColor: '#f99417',
          color: '#fff8ed',
          position: 'fixed',
          bottom: '35px',
          right: '30px',
          display: 'flex',
          alignItems: 'center',
        }}
        startIcon={<img src={"chatbot_icon.png"} alt="Chatbot" style={{ width: '40px' }} />}
      />
    </main>
  );
  
};

export default ForumUser;



// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getAllThreads, createReply, getAllReplies, likeThread } from "../helpers/api-communicator";
// import toast from "react-hot-toast";
// import {Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// //import "chatbot_icon.png";

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

// const ForumUser = () => {
//   const auth = useAuth();
//   const [threadList, setThreadList] = useState<Thread[]>([]);
//   const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
//   const [reply, setReply] = useState("");

//   useEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Threads", { id: "loadthreads" });
//       getAllThreads()
//         .then((data) => {
//           setThreadList(data.threads);
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
//         const updatedReplies = await getAllReplies(threadId);
//         setThreadList((prevThreads) =>
//           prevThreads.map((thread) =>
//             thread.id === threadId ? { ...thread, replies: updatedReplies.replies } : thread
//           )
//         );
//         setReply("");
//         toast.success("Reply added successfully");
//       } else {
//         toast.error("User name not found");
//       }
//     } catch (error) {
//       console.error("Failed to add reply:", error);
//       toast.error("Failed to add reply");
//     }
//   };

//   const handleLikeThread = async (threadId: string) => {
//     try {
//       const username = auth?.user?.name;
//       if (username) {
//         const response = await likeThread(threadId, username);
//         setThreadList((prevThreads) =>
//           prevThreads.map((thread) =>
//             thread.id === threadId ? { ...thread, likes: [...thread.likes, { user: username }] } : thread
//           )
//         );
//         toast.success("Thread liked successfully");
//       } else {
//         toast.error("User not found");
//       }
//     } catch (error) {
//       console.error("Failed to like thread:", error);
//       toast.error("Failed to like thread");
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
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="w-6 h-6 commentsBtn"
//                   onClick={() => setSelectedThreadId(thread.id)}
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <p style={{ color: "#434242" }}>{thread.replies.length}</p>
//                 <button className="like-button" onClick={() => handleLikeThread(thread.id)}>
//                   👍 {thread.likes.length}
//                 </button>
//               </div>
//             </div>
//             {selectedThreadId === thread.id && (
//               <>
//                 <form className="reply-form" onSubmit={(e) => handleAddReply(e, thread.id)}>
//                   <label htmlFor="reply">Enter reply here</label>
//                   <textarea
//                     rows={5}
//                     value={reply}
//                     onChange={(e) => setReply(e.target.value)}
//                     //@ts-ignore
//                     type="text"
//                     name="reply"
//                     className="reply-input"
//                   />
//                   <button type="submit" className="reply-button">SEND</button>
//                 </form>
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
//       variant="contained"
//       color="primary"
//       onClick={handleClick}
//       sx={{
//         px: 2,
//         py: 1,
//         mt: 2,
//         borderRadius: 2,
//         marginBottom: 2,
//         backgroundColor: '#f99417',
//         color: '#fff8ed',
//         position: 'fixed',
//         bottom: '35px',
//         right: '30px',
//         display: 'flex',
//         alignItems: 'center',
//       }}
//       startIcon={<img src={"chatbot_icon.png"} alt="Chatbot" style={{ width: '40px' }} />}
//     />
//       {/* <Button
//             variant="contained"
//             color="primary"
//             onClick={handleClick}
//             sx={{
//               px: 2,
//               py: 1,
//               mt: 2,
//               borderRadius: 2,
//               marginBottom:2,
//               fontSize:'20px',
//               backgroundColor:'#543d7b',
//               color:'#fff8ed',
//               position:'fixed',
//               bottom: '35px',
//               right: "30px",
//             }}
//           >
//             Chatbot 
//         </Button> */}
//     </main>
//   );
// };

// export default ForumUser;








