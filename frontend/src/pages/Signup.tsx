// import React, { useEffect } from "react";
// import { IoIosLogIn } from "react-icons/io";
// import { Box, Typography, Button } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
// import { toast } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// const Signup = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);  //create new form data
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     try {
//       toast.loading("Signing Up", { id: "signup" });
//       await auth?.signup(name, email, password);
//       toast.success("Signed Up Successfully", { id: "signup" });
//     } catch (error) {
//       console.log(error);
//       toast.error("Signing Up Failed", { id: "signup" });
//     }
//   };
//   useEffect(() => {
//     if (auth?.user) {
//       return navigate("/chat");
//     }
//   }, [auth]);
//   return (
//     <Box width={"100%"} height={"100%"}>
//       {/*<Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
//         <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
//   </Box>*/}
//       <Box
//         display={"flex"}
//         flex={{ xs: 1, md: 0.5 }}
//         justifyContent={"center"}
//         alignItems={"center"}
//         padding={2}
//         ml={"auto"}
//         mt={16}
//       >
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             margin: "auto",
//             padding: "30px",
//             boxShadow: "10px 10px 20px #000",
//             borderRadius: "10px",
//             border: "none",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               textAlign="center"
//               padding={2}
//               fontWeight={600}
//               color="#543d7b"
//             >
//               Signup
//             </Typography>
//             <CustomizedInput type="text" name="name" label="Name" text-color="black" />
//             <CustomizedInput type="email" name="email" label="Email" text-color="black" />
//             <CustomizedInput type="password" name="password" label="Password" text-color="black" />
//             <Button
//               type="submit"
//               sx={{
//                 px: 2,
//                 py: 1,
//                 mt: 2,
//                 width: "400px",
//                 borderRadius: 2,
//                 bgcolor: "#f99417",
//                 color: "white",
//                 ":hover": {
//                   bgcolor: "#543d7b",
//                   color: "white",
//                 },
//               }}
//               endIcon={<IoIosLogIn />}
//             >
//               Signup
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Signup;


//WITHOUT BACKGROUND COLOR CHANGE


// import React, { useEffect, useState } from "react";
// import { IoIosLogIn } from "react-icons/io";
// import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
// import { toast } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const [gender, setGender] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     try {
//       toast.loading("Signing Up", { id: "signup" });
//       await auth?.signup(name, email, password, gender); // Pass gender
//       toast.success("Signed Up Successfully", { id: "signup" });
//     } catch (error) {
//       console.log(error);
//       toast.error("Signing Up Failed", { id: "signup" });
//     }
//   };

//   useEffect(() => {
//     if (auth?.user) {
//       return navigate("/chat");
//     }
//   }, [auth]);

//   return (
//     <Box width={"100%"} height={"100%"} style={{backgroundColor: "black"}}>
//       <Box
//         display={"flex"}
//         flex={{ xs: 1, md: 0.5 }}
//         justifyContent={"center"}
//         alignItems={"center"}
//         padding={2}
//         ml={"auto"}
//         mt={16}
//       >
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             margin: "auto",
//             padding: "30px",
//             boxShadow: "10px 10px 20px #000",
//             borderRadius: "10px",
//             border: "none",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               textAlign="center"
//               padding={2}
//               fontWeight={600}
//               color="#543d7b"
//             >
//               Signup
//             </Typography>
//             <CustomizedInput type="text" name="name" label="Name" text-color="black" />
//             <CustomizedInput type="email" name="email" label="Email" text-color="black" />
//             <CustomizedInput type="password" name="password" label="Password" text-color="black" />
            
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="gender-label">Gender</InputLabel>
//               <Select
//                 labelId="gender-label"
//                 id="gender"
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 label="Gender"
//                 name="gender"
//               >
//                 <MenuItem value={"male"}>Male</MenuItem>
//                 <MenuItem value={"female"}>Female</MenuItem>
//                 <MenuItem value={"other"}>Other</MenuItem>
//               </Select>
//             </FormControl>
            
//             <Button
//               type="submit"
//               sx={{
//                 px: 2,
//                 py: 1,
//                 mt: 2,
//                 width: "400px",
//                 borderRadius: 2,
//                 bgcolor: "#f99417",
//                 color: "white",
//                 ":hover": {
//                   bgcolor: "#543d7b",
//                   color: "white",
//                 },
//               }}
//               endIcon={<IoIosLogIn />}
//             >
//               Signup
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Signup;



import React, { useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const gender = formData.get("gender") as string;
    const age = formData.get("age") as string;

    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password, gender, age); // Pass gender
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/menu");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff8ed",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          boxShadow: "10px 10px 20px #000",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#543d7b", // Set the form background color to black
          color: "white", // Ensure text color is white for contrast
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            padding={2}
            fontWeight={600}
            color="white" // Set text color to white for visibility
          >
            Signup
          </Typography>
          <CustomizedInput type="text" name="name" label="Name" text-color="white" />
          <CustomizedInput type="email" name="email" label="Email" text-color="white" />
          <CustomizedInput type="password" name="password" label="Password" text-color="white" />
          {/* gender */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-label" style={{ color: "white" }}>Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
              name="gender"
              sx={{
                color: "white", // Set text color to white for visibility
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
          {/* age */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="age-label" style={{ color: "white" }}>Age</InputLabel>
            <Select
              labelId="age-label"
              id="age"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Age"
              name="age"
              sx={{
                color: "white", // Set text color to white for visibility
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
            >
              <MenuItem value={"< 12"}>less than 12 years old</MenuItem>
              <MenuItem value={"12-25"}>12 to 25 years old</MenuItem>
              <MenuItem value={"26-40"}>26 to 40 years old</MenuItem>
              <MenuItem value={"41-55"}>41 to 55 years old</MenuItem>
              <MenuItem value={"> 55"}>greater than 55 years old</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              width: "400px",
              borderRadius: 2,
              bgcolor: "#f99417",
              color: "white",
              ":hover": {
                bgcolor: "white",
                color: "#543d7b",
              },
            }}
            endIcon={<IoIosLogIn />}
          >
            Signup
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
