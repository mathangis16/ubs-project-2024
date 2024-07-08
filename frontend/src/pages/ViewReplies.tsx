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

const ViewReplies = () => {
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
        // const updatedReplies = await getAllReplies(threadId);
        // setThreadList((prevThreads) =>
        //   prevThreads.map((thread) =>
        //     thread.id === threadId ? { ...thread, replies: updatedReplies.replies } : thread
        //   )
        // );
        // setReply("");
        // toast.success("Reply added successfully");
      } else {
        toast.error("User name not found");
      }
    } catch (error) {
      console.error("Failed to get reply:", error);
      toast.error("Failed to get reply");
    }
  };


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/discussionForum'); 
  };

  return (
    <main className="forum">
      <h2 className="forum-title">Replies</h2>
      <div className="forum-container">
        {threadList.map((thread) => (
          <div className="forum-thread" key={thread.id}>
            <div className="thread-title">
              <h3>{thread.title}</h3>
              <div className="thread-actions">
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
            </div>
            {selectedThreadId === thread.id && (
              <>
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
                        //py: 1,
                        borderRadius: 2,
                        fontSize:'20px',
                        //backgroundColor:'#30448c',
                        backgroundColor:"#51538f",
                        color:'#fff8ed',
                        width: '300px',
                        marginTop: "30px",
                        marginLeft:"530px"
                    }}
                >
                    Back
        </Button>
    </main>
  );
};

export default ViewReplies;
