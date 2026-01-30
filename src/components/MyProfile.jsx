import { useState, useEffect } from "react";
import Profile from "../pictures/Profile.png";
import axios from "axios";
import URL from "../config.js";
import UploadImages from "../utils/UploadImages.jsx";

function MyProfile({ owner }) {
  const [myLabels, setMyLabels] = useState([]);
  const [name, setName] = useState("");
  const [pictures, setPictures] = useState([]);

  console.log(pictures)

  const getUserName = async () => {
    try {
      const info = await axios.get(`${URL}/users/getinfo/${owner}`);
      //console.log(info.data?.data);
      setName(info.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserGroups = async () => {
    try {
      const groups = await axios.get(`${URL}/users/getgroups/${owner}`);
      //console.log(groups.data?.data);
      setMyLabels(groups.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserName();
    getUserGroups();
  }, []);

  useEffect(() => {
  if (pictures.length === 0) return;
  const savePicture = async () => {
    try {
      await axios.patch(`${URL}/users/uploadpicture/${owner}`, {
        email: owner,
        file: pictures[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
  savePicture();
}, [pictures]);



  return (
    <>
      <section className="myprofile">
        <img
          className="myprofile-picture"
          src={pictures?.length > 0 ? pictures[0].url : Profile}
          alt="Profile"
        />
        <UploadImages required setPictures={setPictures} />
      </section>
      <section className="myprofile-info">
        <div className="myprofile-grid">
          <p>
            <strong>Name:</strong>
          </p>
          <p>{name}</p>
        </div>
        <div className="myprofile-grid">
          <p>
            <strong>E-Mail:</strong>
          </p>
          <p>{owner}</p>
        </div>
        <div className="myprofile-grid">
          <p>
            <strong>Groups:</strong>
          </p>
          <ul>
            {myLabels.map((label, idx) => (
              <li key={idx}>{label}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default MyProfile;
