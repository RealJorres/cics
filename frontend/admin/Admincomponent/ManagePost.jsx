import React, { useEffect, useState } from "react";
import axios from "axios";
import Sort from "../Images/Sort.png";
import SearchIcon from "../Images/magnifying.png";
import SideNav from "../Admincomponent/SideNav";
import Header from "../Admincomponent/Header";
import "../AdminCSS/Managepost.css";
import { format } from "date-fns";
import Modal from "react-modal";

const ManagePost = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    type: "",
    images: [],
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/announcements/"
        );
        setAnnouncements(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnnouncements();
  }, []);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/announcements/${id}`);
      setAnnouncements(
        announcements.filter((announcement) => announcement._id !== id)
      );
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const openModal = (announcement) => {
    setCurrentAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      subtitle: announcement.subtitle,
      content: announcement.content,
      type: announcement.type,
      images: announcement.images,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentAnnouncement(null);
    setFormData({ title: "", subtitle: "", content: "", type: "", images: [] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/announcements/${currentAnnouncement._id}`,
        formData
      );
      setAnnouncements(
        announcements.map((announcement) =>
          announcement._id === currentAnnouncement._id
            ? response.data
            : announcement
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <Header />
        <SideNav />
      </div>
      <div className="Mpos-wrapper">
        <div className="Mpos-sort">
          <span>Sort</span>
          <img src={Sort} alt="" />
        </div>
        <div className="Mpos-input">
          <input type="text" className="Mpos-text" />
          <img src={SearchIcon} alt="" className="MposSearch-icon" />
        </div>
      </div>
      <div className="Mpos-tbl">
        <table>
          <tr>
            <th>Title</th>
            <th>Date posted</th>
            <th>Status</th>
          </tr>
          {announcements.map((announcement) => (
            <tr key={announcement._id}>
              <td>{truncateTitle(announcement.title, 25)}</td>
              <td>{`${format(
                new Date(announcement.createdAt),
                "yyyy-MM-dd"
              )}`}</td>
              <td>
                <button onClick={() => openModal(announcement)}>Edit</button>
                <button onClick={() => handleDelete(announcement._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Announcement"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <h2>Edit Announcement</h2>
            <form onSubmit={handleUpdate}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Content:
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </label>
              {/* Add image upload logic if needed */}
              <button type="submit">Update</button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </Modal>
        </table>
      </div>
    </>
  );
};

export default ManagePost;
