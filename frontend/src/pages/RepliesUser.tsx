// import React from "react";

// const RepliesUser = () => {
//     return <div> reply here </div>;
// };

// export default RepliesUser;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { getReplies, createReply } from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Reply = {
  content: string;
  user: string;
};

const RepliesUser: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const auth = useAuth();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (threadId) {
      toast.loading("Loading Replies", { id: "loadreplies" });
      getReplies(threadId)
        .then((data) => {
          setReplies(data.replies);
          toast.success("Successfully loaded replies", { id: "loadreplies" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading replies failed", { id: "loadreplies" });
        });
    }
  }, [threadId]);

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userName = auth?.user?.name;
      if (userName && threadId) {
        await createReply(threadId, reply, userName);
        setReplies((prevReplies) => [...prevReplies, { content: reply, user: userName }]);
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
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", mt: 3, gap: 3 }}>
      <Typography sx={{ textAlign: "center", fontSize: "30px", color: "#543d7b", mb: 2, mx: "auto", fontWeight: "600" }}>
        Replies
      </Typography>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {replies.map((reply, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: "#f5f5f5" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{reply.user}</Typography>
            <Typography variant="body2">{reply.content}</Typography>
          </Box>
        ))}
      </Box>
      <form onSubmit={handleReplySubmit} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Enter your reply"
          variant="outlined"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          <IoMdSend />
        </Button>
      </form>
    </Box>
  );
};

export default RepliesUser;
