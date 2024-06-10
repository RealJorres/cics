import React, { useState, useEffect } from "react";
import "../Content/Content.css";
import { format } from "date-fns";
import axios from "axios";

const Content = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [commentData, setCommentData] = useState({ content: '' });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/announcements/");
        setAnnouncements(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnnouncements();
  }, []);


  const handleAddComment = async (id) => {
    if (!commentData.content.trim()) return; // Ensure comment content is not empty
    try {
      const response = await axios.post(`http://localhost:5000/api/announcements/${id}/comments`, { user: localStorage.getItem("username"), content: commentData.content });
      setAnnouncements(announcements.map((announcement) => (announcement._id === id ? response.data : announcement)));
      setCommentData({ content: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/announcements/${id}/like`, { username: localStorage.getItem("username") });
      setAnnouncements(announcements.map((announcement) => (announcement._id === id ? response.data : announcement)));
    } catch (error) {
      console.error('Error liking announcement:', error);
    }
  };

  const truncateTitle = (subtitle, maxLength) => {
    if (subtitle.length > maxLength) {
      return subtitle.slice(0, maxLength) + "...";
    }
    return subtitle;
  };

  return (
    <div className="content-container">
      {announcements.map((announcement) => 
      announcement.type == "regular"? (
        <div key={announcement._id} className="announcement-box">
          <div className="announcement-header">
            <img src={`http://localhost:5000/api/announcements/image/${announcement.images[0]}`}/>
            <h2 className="announcement-title">{truncateTitle(announcement.title, 50)}</h2>
          </div>
          <div className="announcement-body">
            <p>{announcement.content}</p>
            <p>{`Created at: ${format(new Date(announcement.createdAt), 'yyyy-MM-dd HH:mm:ss')}`}</p>
            <p>{`Likes: ${announcement.likes}`}</p>
          </div>
          <div className="action-buttons">
            <button className="like-button" onClick={() => handleLike(announcement._id)}>Like</button>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            {announcement.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <h5>{comment.username}</h5>
                <p>{comment.content}</p>
                <p className="comment-meta">{`Commented at: ${format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss')}`}</p>
              </div>
            ))}
            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddComment(announcement._id);
              }}
            >
              <input
                type="text"
                name="content"
                value={commentData.content}
                onChange={(e) => setCommentData({ content: e.target.value })}
                required
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
          <hr />
        </div>
      ):null
      )}
    </div>
  );
};

export default Content;
