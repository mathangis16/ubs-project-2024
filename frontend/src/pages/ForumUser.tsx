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
import { getAllThreads, createReply, getAllReplies } from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Reply = {
  content: string;
  user: { name: string }; // Assuming user has a name property
};

type Thread = {
  title: string;
  id: string;
  replies: Reply[];
};

const ForumUser = () => {
  const auth = useAuth();
  const [threadList, setThreadList] = useState<Thread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

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

  return (
    <main className="home">
      <h2 className="homeTitle">Reply to a Thread!</h2>
      <div className="thread__container">
        {threadList.map((thread) => (
          <div className="thread__item" key={thread.id}>
            <p>{thread.title}</p>
            <div className="react__container">
              <div className="comments__container">
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
                <p style={{ color: "#434242" }}>{thread.replies.length}</p>
              </div>
            </div>
            {selectedThreadId === thread.id && (
              <div className="reply__section">
                <form onSubmit={(e) => handleAddReply(e, thread.id)}>
                  <label htmlFor="reply">Reply to the thread</label>
                  <textarea
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    //@ts-ignore
                    type="text"
                    name="reply"
                    className="modalInput"
                  />
                  <button className="modalBtn">SEND</button>
                </form>
                <div className="thread__container">
                  {thread.replies.map((reply, index) => (
                    <div className="thread__item" key={index}>
                      <p>{reply.content}</p>
                      <div className="react__container">
                        <p style={{ opacity: "0.5" }}>by {reply.user.name}</p> {/* Render user's name */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default ForumUser;






// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, Button } from "@mui/material";
// import { IoMdSend } from "react-icons/io";
// import { useAuth } from "../context/AuthContext";
// import { createThread, getAllThreads } from "../helpers/api-communicator";
// import toast from "react-hot-toast";
// //import RepliesUser from "../pages/RepliesUser"
// //import Comments from "../helpers/comments";

// type Thread = {
//   title: string;
//   id: string;
//   replies: Array<{ content: string; user: string }>;
// };

// const ForumUser = () => {
//   const auth = useAuth();
//   const [thread, setThread] = useState("");
//   const [threadList, setThreadList] = useState<Thread[]>([]);

//   //const navigate = useNavigate();

// //   const handleAddComment = () => {
// //     // it will basically be all the replies functions that need to be in this file?
// //     //navigate(`/${thread}/replies`);
// //   };
// // const handleAddComment = (threadId: string) => {
// //     navigate('/${threadId}/replies');
// //   };

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

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const userName = auth?.user?.name;
//       if (userName) {
//         await createThread(thread, userName);
//         setThreadList((prevThreads) => [...prevThreads, { title: thread, id: "new_id", replies: [] }]);
//         setThread("");
//         toast.success("Thread created successfully");
//       } else {
//         toast.error("User name not found");
//       }
//     } catch (error) {
//       console.error("Failed to create thread:", error);
//       toast.error("Failed to create thread");
//     }
//   };

//   return (
//     <>
// 			<main className='home'>
// 				<h2 className='homeTitle'>Reply to a Thread!</h2>
// 				<div className='thread__container'>
// 					{threadList.map((thread) => (
// 						<div className='thread__item' key={thread.id}>
// 							<p>{thread.title}</p>
// 							<div className='react__container'>
//                                 <div className='likes__container'>
//                                     <svg
//                                         xmlns='http://www.w3.org/2000/svg'
//                                         viewBox='0 0 24 24'
//                                         fill='currentColor'
//                                         className='w-6 h-6 likesBtn'
//                                         // onClick={() => handleAddComment(thread.id)}
//                                     >
//                                         <path
//                                         fillRule='evenodd'
//                                         d='M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z'
//                                         clipRule='evenodd'
//                                         />
//                                     </svg>
//                                     <p style={{ color: "#434242" }}>
//                                         {/* FIX THISSS */}
//                                         {/* {numberOfComments === 0 ? "" : numberOfComments} */}
//                                     </p>
//                                     </div>
// 								{/* <Likes
// 									numberOfLikes={thread.likes.length}
// 									threadId={thread.id}
// 								/> */}
// 								{/* <Comments
// 									numberOfComments={thread.replies.length}
// 									threadId={thread.id}
// 									title={thread.title}
// 								/> */}
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</main>
// 		</>
//   );
// };

// export default ForumUser;
