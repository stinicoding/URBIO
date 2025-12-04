import Profile from "../pictures/Profile.png";
import axios from "axios";
import URL from "../config.js";
import renderComments from "../utils/renderComments";
import labelOptions from "../data/labelOptions";

import { useState, useEffect } from "react";
import {
  Rating,
  TextField,
  List,
  ListItem,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";
import dayjs from "dayjs"; //npm install @mui/x-date-pickers dayjs
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Groups({ owner }) {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [labels, setLabels] = useState(labelOptions);
  const [myLabels, setMyLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all");

  //console.log(owner);
  //console.log(myLabels);
  //console.log(selectedLabels);
  //console.log(ratingFilter)
  //console.log(timeFilter);

  const handleChangeSelectedLabels = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLabels(typeof value === "string" ? value.split(",") : value);
  };

  const displayPosts = async () => {
    try {
      //post function, because get will pass the email in the url
      const response = await axios.post(`${URL}/posts/getposts`);
      //console.log(response.data.data);
      setAllPosts(response.data.data);
      setFilteredPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //filers: location, labels, rating, time
  const filterPosts = () => {
    let filtered = allPosts;
    if (selectedLabels.length > 0) {
      filtered = filtered.filter((post) =>
        //some: one or more labels included, every: all labels included
        selectedLabels.some((label) => post.labels.includes(label))
      );
    }
    if (location.length > 0) {
      filtered = filtered.filter((post) =>
        post.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (ratingFilter !== null) {
      filtered = filtered.filter((post) => post.rating >= ratingFilter);
    }
    if (timeFilter !== "all") {
      let startDate;
      if (timeFilter === "today") {
        startDate = dayjs().startOf("day");
      } else if (timeFilter === "7") {
        startDate = dayjs().subtract(7, "day");
      } else if (timeFilter === "14") {
        startDate = dayjs().subtract(14, "day");
      } else if (timeFilter === "30") {
        startDate = dayjs().subtract(1, "month");
      }
      filtered = filtered.filter((post) =>
        dayjs(post.datetime).isAfter(startDate)
      );
    }
    setFilteredPosts(filtered);
  };

  const saveComment = async (post_id) => {
    try {
      await axios.post(`${URL}/comments/newcomment`, {
        post_id: post_id,
        owner: owner,
        comment: comment,
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const displayComments = async (post_id) => {
    try {
      const response = await axios.post(`${URL}/comments/${post_id}`);
      //console.log(response.data.data);
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async (label) => {
    if (myLabels?.length > 0) {
      setMyLabels((prev) => {
        const newLabels = prev.includes(label)
          ? prev.filter((l) => l !== label)
          : [...prev, label];

        updateUserGroups(newLabels);
        return newLabels;
      });
    } else {
      setMyLabels(label);
      await updateUserGroups(label);
      return;
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

  const updateUserGroups = async (newLab) => {
    //console.log(owner);
    try {
      const groups = await axios.patch(`${URL}/users/updategroups`, {
        owner: owner,
        labels: newLab,
      });
      //console.log(groups.data.data.groups);
      setMyLabels(groups.data?.data?.groups);
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    method: "GET",
    url: "https://google-place-autocomplete-and-place-info.p.rapidapi.com/maps/api/place/autocomplete/json",
    params: { input: location },
    headers: {
      "x-rapidapi-key": "fc45359ecbmsh5392bafe7eb6944p19da2ajsn49e3444210af",
      "x-rapidapi-host":
        "google-place-autocomplete-and-place-info.p.rapidapi.com",
    },
  };

  const findPlace = async () => {
    if (location.length < 3) {
      setShowSuggestion(false);
      return;
    }
    try {
      const response = await axios.request(options);
      setSuggestion(response.data.predictions);
      //console.log(response.data.predictions)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayPosts();
    getUserGroups();
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
  }, [selectedLabels, location, ratingFilter, timeFilter, allPosts]);

  useEffect(() => {
    findPlace();
  }, [location]);

  return (
    <>
      <h3>My Interest Groups</h3>
      <div className="groups-grid">
        <div>
          <TextField
            sx={{ minWidth: 260 }}
            className="white-background"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowSuggestion(true);
            }}
            label="Location"
          />
          <List>
            {showSuggestion &&
              suggestion?.map((s) => (
                <ListItem
                  className="white-background"
                  onClick={() => {
                    setLocation(s.description);
                    setShowSuggestion(false);
                  }}
                  key={s.place_id}
                >
                  {s.description}
                </ListItem>
              ))}
          </List>
          <FormControl sx={{ minWidth: 260 }}>
            <InputLabel>Time</InputLabel>
            <Select
              className="white-background"
              value={timeFilter}
              label="Time"
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="14">Last 14 Days</MenuItem>
              <MenuItem value="30">Last Month</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl
            sx={{ m: 1, minWidth: 260, margin: 0 }}
            className="white-background"
          >
            <InputLabel id="groups-label">Groups</InputLabel>
            <Select
              labelId="groups-label"
              multiple
              value={selectedLabels}
              onChange={handleChangeSelectedLabels}
              input={<OutlinedInput label="Groups" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {[...labels]
                .sort((a, b) => myLabels?.includes(b) - myLabels?.includes(a))
                .map((label) => (
                  <MenuItem
                    key={crypto.randomUUID()}
                    value={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {label}
                    <IconButton
                      size="small"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(label);
                      }}
                    >
                      {myLabels?.includes(label) ? (
                        <StarIcon style={{ color: "#E86B92", fontSize: 18 }} />
                      ) : (
                        <StarBorderIcon style={{ fontSize: 18 }} />
                      )}
                    </IconButton>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <p>Rating</p>
          <Rating
            icon={<StarIcon style={{ color: "#E86B92", fontSize: 18 }} />}
            emptyIcon={<StarBorderIcon style={{ fontSize: 18 }} />}
            name="simple-controlled"
            value={ratingFilter}
            onChange={(event, newValue) => setRatingFilter(newValue)}
          />
        </div>
      </div>
      <p className="results">Results: {filteredPosts.length}</p>
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
                <img
                  className="post-img"
                  src={post.pictures[pictureIndex]?.url}
                />
                <div className="post-img-small-overview">
                  {post.pictures.map((pic, idx) => (
                    //? before url to update only the posts with several pictures (without it the other posts would crash)
                    <img
                      key={pic.public_id}
                      className="post-img-small"
                      src={pic?.url}
                      onClick={() => setPictureIndex(idx)}
                    />
                  ))}
                </div>
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
                    renderComments(comments, post, async () => {
                      await displayComments(post._id);
                    })}
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
                    icon={
                      <StarIcon style={{ color: "#E86B92", fontSize: 18 }} />
                    }
                    emptyIcon={<StarBorderIcon style={{ fontSize: 18 }} />}
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
