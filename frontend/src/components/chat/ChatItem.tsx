import React from "react";
import {Box, Avatar, Typography} from "@mui/material";
import {useAuth} from "../../context/AuthContext";

const ChatItem= ({content,role}:{content:string;role:"user"|"assistant";})=>{
    const auth= useAuth();
    return role=== "assistant" ? (
        <Box sx={{display:"flex", p:2, bgcolor:"black", my:2, gap:2}}>
            <Avatar sx={{m1:"0"}}>
                <img src="tobias.jpeg" alt="tobias" width={"30px"} />
            </Avatar>
            <Box>
                <Typography fontSize={"20px"} fontFamily={"Space Grotesk"}>{content}</Typography>
            </Box>
        </Box>
    ):(
        <Box sx={{display:"flex", p:2, bgcolor:"#004d56", gap:2, my:2}}>
            <Avatar sx={{m1:"0", bgcolor:"black", color:"white"}}>
                {auth?.user?.name[0]}
                {auth?.user?.name.split(" ")[1][0]}
            </Avatar>
            <Box>
                <Typography fontSize={"20px"} fontFamily={"Space Grotesk"}>{content}</Typography>
            </Box>
        </Box>
    );
    
};

export default ChatItem;