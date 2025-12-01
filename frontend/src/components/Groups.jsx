import Profile from "../pictures/Profile.png";
import Barcelona_splash from "../pictures/Barcelona_splash.jpg";
import axios from "axios";

import { useState, useEffect } from "react";
import { Button, Rating } from "@mui/material";
import dayjs from "dayjs"; //npm install @mui/x-date-pickers dayjs

const labelOptions = [
  "Pet-friendly",
  "Vegan",
  "Vegetarian",
  "Gluten-free",
  "Romantic",
  "Budget-friendly",
  "Luxury",
  "Family-friendly",
  "Nightlife",
  "Beach",
  "Viewpoint",
  "Sightseeing",
  "Architecture",
  "Historic",
  "Cultural",
  "Local Favorite",
  "Outdoor",
  "Hiking",
  "Nature",
  "Hidden Gem",
  "Popular",
  "Modern",
  "Art",
  "Photography Spot",
  "Shopping",
  "Foodie",
  "Traditional",
  "Relaxing",
  "Scenic Route",
  "Rainy-day Activity",
];

function Groups({ owner }) {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [myLabels, setMyLabels] = useState([]);
  const [recLabels, setRecLabels] = useState([]);
  const [activeLabels, setActiveLabels] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  //console.log(myLabels);
  //console.log(recLabels);
  //console.log(activeLabels);

  const displayRecLabels = async () => {
    try {
      const labels = await setRecLabels(labelOptions);
      //console.log(labels);
    } catch (error) {
      console.log(error);
    }
  };

  const displayMyLabels = async () => {
    try {
      const labels = await setMyLabels(labelOptions);
      //console.log(labels);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLabel = (label) => {
    setActiveLabels((lab) => {
      let updated;
      if (lab.includes(label)) {
        updated = lab.filter((l) => l !== label); //deactivate
      } else {
        updated = [...lab, label]; //activate
      }
      return updated;
    });
  };

  const displayPosts = async () => {
    try {
      //post function, because get will pass the email in the url
      const response = await axios.post(
        `http://localhost:4040/posts/getposts`,
        { owner: owner }
      );
      //console.log(response.data.data);
      setAllPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterPosts = () => {
    if (activeLabels.length === 0) {
      setFilteredPosts(allPosts);
      return;
    }
    const filtered = allPosts.filter((post) =>
      activeLabels.every((label) => post.labels.includes(label))
    );

    setFilteredPosts(filtered);
  };

  const displayComments = async (post_id) => {
    try {
      const response = await axios.post(
        `http://localhost:4040/comments/${post_id}`
      );
      //console.log(response.data.data);
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayMyLabels();
    displayRecLabels();
    displayPosts();
  }, []); //without the [] it will run everytime any state updates, with the empty [] it runs once

  useEffect(() => {
    if (allPosts.length > 0) {
      allPosts.forEach((post) => {
        displayComments(post._id);
      });
    }
  }, [allPosts]);

  useEffect(() => {
    filterPosts();
  }, [activeLabels, allPosts]);

  return (
    <>
      <h3>My Interest Groups</h3>
      <div>
        <h4>My Interest Groups</h4>
        <div>
          {myLabels.map((label) => (
            <Button
              key={label}
              className={
                activeLabels.includes(label)
                  ? "button-mui-activated"
                  : "button-mui"
              }
              variant="outlined"
              onClick={() => toggleLabel(label)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h4>More Interest Groups</h4>
        <div>
          {recLabels.map((label) => (
            <Button
              key={label}
              className={
                activeLabels.includes(label)
                  ? "button-mui-activated"
                  : "button-mui"
              }
              variant="outlined"
              onClick={() => toggleLabel(label)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div>
        {filteredPosts.map(
          (
            post //map without {} or return to actually render the posts
          ) => (
            <div key={post._id} className="post-grid">
              <section>
                <div className="post-info">
                  <div className="post-info">
                    <img className="icon-profile" src={Profile} alt="Profile" />
                    <h4 className="post-location">{post.location}</h4>
                  </div>
                  <p>{dayjs(post.datetime).format("MMMM D, YYYY h:mm A")}</p>
                </div>
                <img className="post-img" src={Barcelona_splash} />
                <div className="post-labels">
                  {post.labels?.map((lab, idx) => (
                    <button key={idx} className="post-label">
                      {lab}
                    </button>
                  ))}
                </div>
                <div className="post-box">
                  <p
                    className="show-comments"
                    onClick={async () => {
                      await displayComments(post._id);
                      if (showComments === false) {
                        setShowComments(true);
                      } else setShowComments(false);
                    }}
                  >
                    {showComments ? "Hide Comments" : "Show Comments"}
                  </p>
                  {showComments &&
                    comments?.map(
                      (com, index) =>
                        com.post_id == post._id && (
                          <div key={index} className="comment">
                            <p className="comment-owner">{`${com.owner}: `}</p>
                            <p>{com.comment}</p>
                            <div className="icons">
                              <p className="post-icon">✎</p>
                              <p className="post-icon">✖</p>
                            </div>
                          </div>
                        )
                    )}
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="button-blue"
                    onClick={async () => {
                      await saveComment(post._id);
                      await displayComments(post._id);
                      setShowComments(true);
                    }}
                  >
                    SEND
                  </button>
                </div>
              </section>
              <section>
                <div className="flex">
                  <h4>{post.caption}</h4>
                </div>
                <p>{post.description}</p>
                <div className="post-rating">
                  <p>Rating: </p>
                  <Rating
                    id="rating-mui"
                    name="simple-controlled"
                    value={post.rating}
                    readOnly
                  />
                </div>
                <p>
                  Posted: {dayjs(post.datetime).format("MMMM D, YYYY h:mm A")}
                </p>
              </section>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Groups;
