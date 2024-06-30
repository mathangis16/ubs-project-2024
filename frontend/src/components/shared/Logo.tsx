import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="new_white_header_logo.png"
          alt="tobias"
          width={"120px"}
          height={"50px"}
          className="image-inverted"
        />
      </Link>{" "}
       {/* <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px", color: "white" }}>ToBias</span> 

      </Typography>   */}
    </div>
  );
};

export default Logo;