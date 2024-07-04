import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { useNavigate } from 'react-router-dom';

const FlyoutLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      <a href={href} style={{ color: "white", textDecoration: "none" }}>
        {children}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "#6366F1",
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.3s ease-out",
          }}
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div
              style={{
                position: "absolute",
                top: -6,
                left: 0,
                right: 0,
                height: 6,
                backgroundColor: "transparent",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: 16,
                height: 16,
                backgroundColor: "white",
                transform: "translate(-50%, -50%) rotate(45deg)",
              }}
            />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: 256, backgroundColor: "white", padding: 24, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: "bold" }}>
          <a href="#" onClick={() => navigate("/chat")} style={{ textDecoration: "none", color: "inherit" }}>
            Chatbot
          </a>
        </h3>
        {/* <a href="#" style={{ display: "block", fontSize: 14, textDecoration: "none", color: "#6366F1", marginTop: 8 }}>
          Introduction
        </a>
        <a href="#" style={{ display: "block", fontSize: 14, textDecoration: "none", color: "#6366F1", marginTop: 8 }}>
          Pay as you go
        </a> */}
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: "bold" }}>
          <a href="#" onClick={() => navigate("/forumUser")} style={{ textDecoration: "none", color: "inherit" }}>
            Discussion Forum
          </a>
        </h3>
        {/* <a href="#" style={{ display: "block", fontSize: 14, textDecoration: "none", color: "#6366F1", marginTop: 8 }}>
          Startups
        </a>
        <a href="#" style={{ display: "block", fontSize: 14, textDecoration: "none", color: "#6366F1", marginTop: 8 }}>
          SMBs
        </a>
        <a href="#" style={{ display: "block", fontSize: 14, textDecoration: "none", color: "#6366F1", marginTop: 8 }}>
          Enterprise
        </a> */}
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: "bold" }}>
          <a href="#" onClick={() => navigate("/questionaire")} style={{ textDecoration: "none", color: "inherit" }}>
            Questionnaire
          </a>
        </h3>
      </div>
      {/* <button
        style={{
          width: "100%",
          padding: "8px 16px",
          border: "2px solid #1F2937",
          borderRadius: 8,
          fontWeight: "bold",
          backgroundColor: "white",
          color: "#1F2937",
          transition: "background-color 0.3s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1F2937";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.color = "#1F2937";
        }}
      >
        Contact sales
      </button> */}
    </div>
  );
};

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar position="static" style={{ backgroundColor: "#30448c", boxShadow: "none" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {auth?.isLoggedIn ? (
            <>
              <FlyoutLink href="#" FlyoutContent={PricingContent}>
                <Button style={{ color: "white", fontSize: "2.2rem" }}>☰</Button>
              </FlyoutLink>
              <NavigationLink
                bg="#f99417"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
                //style={{ backgroundColor: "#f99417", color: "white", marginLeft: "8px" }}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#f99417"
                to="/login"
                text="Login"
                textColor="white"
                //style={{ backgroundColor: "#f99417", color: "white", marginRight: "8px" }}
              />
              <NavigationLink
                bg="#f99417"
                textColor="white"
                to="/signup"
                text="Signup"
                //style={{ backgroundColor: "#f99417", color: "white" }}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

















// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Logo from "./shared/Logo";
// import { useAuth } from "../context/AuthContext";
// import NavigationLink from "./shared/NavigationLink";

// const FlyoutLink = ({
//   children,
//   href,
//   FlyoutContent,
// }: {
//   children: React.ReactNode;
//   href: string;
//   FlyoutContent?: React.ElementType;
// }) => {
//   const [open, setOpen] = useState(false);

//   const showFlyout = FlyoutContent && open;

//   return (
//     <div
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//       className="relative w-fit h-fit"
//     >
//       <a href={href} className="relative text-white">
//         {children}
//         <span
//           style={{
//             transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
//           }}
//           className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
//         />
//       </a>
//       <AnimatePresence>
//         {showFlyout && (
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 15 }}
//             style={{ translateX: "-50%" }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="absolute left-1/2 top-12 bg-white text-black"
//           >
//             <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
//             <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
//             <FlyoutContent />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const PricingContent = () => {
//   return (
//     <div className="w-64 bg-white p-6 shadow-xl">
//       <div className="mb-3 space-y-3">
//         <h3 className="font-semibold">For Individuals</h3>
//         <a href="#" className="block text-sm hover:underline">
//           Introduction
//         </a>
//         <a href="#" className="block text-sm hover:underline">
//           Pay as you go
//         </a>
//       </div>
//       <div className="mb-6 space-y-3">
//         <h3 className="font-semibold">For Companies</h3>
//         <a href="#" className="block text-sm hover:underline">
//           Startups
//         </a>
//         <a href="#" className="block text-sm hover:underline">
//           SMBs
//         </a>
//         <a href="#" className="block text-sm hover:underline">
//           Enterprise
//         </a>
//       </div>
//       <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
//         Contact sales
//       </button>
//     </div>
//   );
// };

// const Header = () => {
//   const auth = useAuth();
//   return (
//     <AppBar
//       sx={{ bgcolor: "#30448c", position: "static", boxShadow: "none" }}
//     >
//       <Toolbar sx={{ display: "flex" }}>
//         <Logo />
//         <div>
//           {auth?.isLoggedIn ? (
//             <>
//               {/* <NavigationLink
//                 bg="#f99417"
//                 to="/chat"
//                 text="Chat"
//                 textColor="white"
//               /> */}
//               {/* <NavigationLink
//                 bg="#f99417"
//                 to="/menu"
//                 text="Menu"
//                 textColor="white"
//               /> */}
//               <div className="flex h-[500px] justify-center bg-neutral-900 px-3 py-12">
//                 <FlyoutLink href="#" FlyoutContent={PricingContent}>
//                   Pricing
//                 </FlyoutLink>
//               </div>
//               <NavigationLink
//                 bg="#f99417"
//                 textColor="white"
//                 to="/"
//                 text="Logout"
//                 onClick={auth.logout}
//               />
//             </>
//           ) : (
//             <>
//               <NavigationLink
//                 bg="#f99417"
//                 to="/login"
//                 text="Login"
//                 textColor="white"
//               />
//               <NavigationLink
//                 bg="#f99417"
//                 textColor="white"
//                 to="/signup"
//                 text="Signup"
//               />
//             </>
//           )}
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;