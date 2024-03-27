import React from "react";
import "../styles/styles.css";

const FeedPage = () => {
  const handleLogout = () => {};
  const handleCreatePost = () => {};

  return (
    <div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <button onClick={handleCreatePost} className="create-post-button">
        Create Post
      </button>

      <div className="feed-container">
        <div className="feed-content"></div>
      </div>
    </div>
  );
};

export default FeedPage;
