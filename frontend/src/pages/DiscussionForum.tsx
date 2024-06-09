import React from "react";

const DiscussionForum = () => {
    const handleButtonClick = () => {
        window.location.href = 'http://localhost:4000'; 
    };// URL of the React application
    return (
    <div> 
        <h1>Click here to go to the discussion forum!</h1>
      <button onClick={handleButtonClick}>Go to React App</button>
    </div>);
};

export default DiscussionForum;