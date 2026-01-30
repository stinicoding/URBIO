import { useState, useEffect } from "react";
import Profile from "../pictures/Profile.png";
import axios from "axios";
import URL from "../config.js";

function MyProfile({ owner, owner_name }) {
  const [myLabels, setMyLabels] = useState([]);
  const [name, setName] = useState("");

  const getUserName = async () => {
    try {
      const info = await axios.get(`${URL}/users/getinfo/${owner}`);
      console.log(info.data?.data);
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

  return (
    <>
      <section className="myprofile">
        <img className="myprofile-picture" src={Profile} alt="Profile" />
        <button>Upload Profile Picture</button>
        <h2 className="header-owner">{owner}</h2>
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
