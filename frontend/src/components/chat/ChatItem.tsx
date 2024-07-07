import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant"; }) => {
  const auth = useAuth();
  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "transparent", my: 1, gap: 1, justifyContent: "flex-start"  }}>
      <Avatar sx={{ m1: "0", width: 60, height: 60, bgcolor: "black" }}>
        <img src="tobias_black.jpeg" alt="tobias" width={"40px"} />
      </Avatar>
      <Box>
        <Typography fontSize={"25px"} fontFamily={"Space Grotesk"} color={"black"} bgcolor={"white"} paddingX={"10px"} borderRadius={"5px"}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "transparent", gap: 1, my: 1, justifyContent: "flex-end" }}>
      {/* <Avatar sx={{ m1: "0", bgcolor: "black", color: "white", width: 60, height: 60 }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar> */}
      <Box>
        <Typography fontSize={"25px"} fontFamily={"Space Grotesk"} textAlign={"left"} bgcolor={"#004d56"} paddingX={"10px"} borderRadius={"5px"}>{content}</Typography>
      </Box>
      <Avatar sx={{ m1: "0", bgcolor: "black", color: "white", width: 60, height: 60 }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
    </Box>
  );
};

export default ChatItem;
