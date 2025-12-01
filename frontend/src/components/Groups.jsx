import Profile from "../pictures/Profile.png";
import Barcelona_splash from "../pictures/Barcelona_splash.jpg";
import axios from "axios";
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
  useTheme,
} from "@mui/material";
import dayjs from "dayjs"; //npm install @mui/x-date-pickers dayjs

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

function getStyles(label, myLabels, theme) {
  return {
    fontWeight: myLabels.includes(label)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function Groups({ owner }) {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [myLabels, setMyLabels] = useState([]);
  const [recLabels, setRecLabels] = useState([]);
  const [activeLabels, setActiveLabels] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all");
  const theme = useTheme();

  //console.log(myLabels);
  //console.log(recLabels);
  //console.log(activeLabels);
  //console.log(ratingFilter)
  //console.log(timeFilter);

  //set recommended Labels (that are not included in my Labels)
  const displayRecLabels = async () => {
    try {
      const rec = labelOptions.filter((label) => !myLabels.includes(label));
      setRecLabels(rec);
      //console.log(rec);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMyLabels = (event) => {
    const {
      target: { value },
    } = event;
    setMyLabels(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeRecLabels = (event) => {
    const {
      target: { value },
    } = event;
    setRecLabels(typeof value === "string" ? value.split(",") : value);
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
      setFilteredPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //filers: location, labels, rating, time
  const filterPosts = () => {
    let filtered = allPosts;
    if (activeLabels.length > 0) {
      filtered = filtered.filter((post) =>
        activeLabels.every((label) => post.labels.includes(label))
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
    setMyLabels([
      "Pet-friendly",
      "Vegan",
      "Vegetarian",
      "Gluten-free",
      "Romantic",
    ]); //for testing
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
  }, [activeLabels, location, ratingFilter, timeFilter, allPosts]);

  useEffect(() => {
    findPlace();
  }, [location]);

  useEffect(() => {
    displayRecLabels();
  }, [myLabels]);

  return (
    <>
      <h3>My Interest Groups</h3>
      <div className="groups-grid">
        <div>
          <TextField
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
          <p>Rating</p>
          <Rating
            className="rating-filter"
            name="simple-controlled"
            value={ratingFilter}
            onChange={(event, newValue) => setRatingFilter(newValue)}
          />
          <FormControl fullWidth>
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
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="demo-multiple-chip-label">Groups</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={myLabels}
              onChange={handleChangeMyLabels}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {myLabels.map((label) => (
                <MenuItem
                  key={label}
                  value={label}
                  style={getStyles(label, myLabels, theme)}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="demo-multiple-chip-label">Recommended</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={recLabels}
              onChange={handleChangeRecLabels}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {recLabels.map((label) => (
                <MenuItem
                  key={label}
                  value={label}
                  style={getStyles(label, recLabels, theme)}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div></div>
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
                  {showComments && renderComments(comments, post)}
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
                    className="rating-mui"
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
