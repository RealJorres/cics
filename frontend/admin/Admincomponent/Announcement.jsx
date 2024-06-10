import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminCSS/Announcement.css";
import SideNav from "../Admincomponent/SideNav";
import Header from "../Admincomponent/Header";
import axios from "axios";
import uploadimg from "../Images/upload.png";

const Announcement = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("type", type);
    formData.append("username", username);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/announcements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/managepost");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <SideNav />
      </div>
      <form className="inputs-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
          className="admin-input"
        />
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
          placeholder="Subtitle"
          className="admin-input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          name="textarea"
          id="#"
          className="admin-textArea"
        ></textarea>
        <div>
          <div className="checkbtn">
            <label htmlFor="">Regular</label>
            <input
              id="type"
              name="type"
              type="radio"
              value={type}
              onClick={() => setType("regular")}
            />
            <label htmlFor="">Trending</label>
            <input
              id="type"
              name="type"
              type="radio"
              value={type}
              onClick={() => setType("trending")}
            />
          </div>
          {/* <button className="btn-uploading">
            <img src={uploadimg} alt="" />
          </button> */}
        </div>
        <div>
          <label>Images: </label>
          <br />
          <input type="file" name="images" multiple onChange={handleFileChange} required />
        </div>
        <div className="inputs-btn">
          <button className="btnPostnow" type="submit">
            Post now
          </button>
        </div>
      </form>
    </>
  );
};

export default Announcement;
