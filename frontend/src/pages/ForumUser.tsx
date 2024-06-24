import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { createThread, getAllThreads } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import RepliesUser from "../pages/RepliesUser"
//import Comments from "../helpers/comments";

type Thread = {
  title: string;
  id: string;
  replies: Array<{ content: string; user: string }>;
};

const ForumUser = () => {
  const auth = useAuth();
  const [thread, setThread] = useState("");
  const [threadList, setThreadList] = useState<Thread[]>([]);

  const navigate = useNavigate();

//   const handleAddComment = () => {
//     // it will basically be all the replies functions that need to be in this file?
//     //navigate(`/${thread}/replies`);
//   };
const handleAddComment = (threadId: string) => {
    navigate('/thread/:threadId/repliesUser');
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
				<h2 className='homeTitle'>Reply to a Thread!</h2>
				<div className='thread__container'>
					{threadList.map((thread) => (
						<div className='thread__item' key={thread.id}>
							<p>{thread.title}</p>
							<div className='react__container'>
                                <div className='likes__container'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                        className='w-6 h-6 likesBtn'
                                        onClick={handleAddComment}
                                    >
                                        <path
                                        fillRule='evenodd'
                                        d='M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z'
                                        clipRule='evenodd'
                                        />
                                    </svg>
                                    <p style={{ color: "#434242" }}>
                                        {/* FIX THISSS */}
                                        {/* {numberOfComments === 0 ? "" : numberOfComments} */}
                                    </p>
                                    </div>
								{/* <Likes
									numberOfLikes={thread.likes.length}
									threadId={thread.id}
								/> */}
								{/* <Comments
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

export default ForumUser;
