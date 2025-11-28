import Profile from "../pictures/Profile.png";
import Barcelona_splash from "../pictures/Barcelona_splash.jpg";
import axios from "axios";

import { useState, useEffect, Fragment } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
  List,
  ListItem,
  Rating,
} from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker, //combines date and time picker in one
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

function Blog({ owner }) {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState([]);
  const [datetime, setDatetime] = useState(dayjs());
  const [location, setLocation] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  //console.log(datetime.format())
  //console.log(allPosts); //outside of the function so the state is updated
  //console.log(comments);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCaption("");
    setDescription("");
    setLabels([]);
    setDatetime(dayjs());
    setLocation("");
    setSuggestion([]);
    setRating(0);
  };

  const savePost = async () => {
    try {
      await axios.post("http://localhost:4040/posts/newpost", {
        owner: owner,
        caption: caption,
        description: description,
        labels: labels,
        datetime: datetime.format(),
        location: location,
        picture: "test",
        rating: rating,
        comments: comments,
      });
    } catch (error) {
      console.log(error);
    }
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

  const saveComment = async (post_id) => {
    try {
      await axios.post("http://localhost:4040/comments/newcomment", {
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
      const response = await axios.post(
        `http://localhost:4040/comments/${post_id}`
      );
      //console.log(response.data.data);
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    savePost();
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
  }, []); //without the [] it will run everytime any state updates, with the empty [] it runs once

  useEffect(() => {
    if (allPosts.length > 0) {
      allPosts.forEach((post) => {
        displayComments(post._id);
      });
    }
  }, [allPosts]);

  useEffect(() => {
    findPlace();
  }, [location]);

  return (
    <>
      <h3>MyBlog</h3>
      <div>
        {allPosts.length < 1 && (
          <div className="screen">
            <h4>Create your first Post!</h4>
          </div>
        )}
        <Fragment>
          <div className="center">
            <Button
              id="button-mui"
              variant="outlined"
              onClick={handleClickOpen}
            >
              ✚ New Blog Post
            </Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: "100vw",
                maxHeight: "80vh",
                margin: "auto",
              },
            }}
          >
            <DialogTitle>New Blog Post</DialogTitle>
            <DialogContent>
              <DialogContentText>New Blog Post</DialogContentText>
              <form className="new-post-form">
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Caption"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Describe Your Journey"
                  type="text"
                  fullWidth
                  variant="standard"
                  multiline
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Upload Picture"
                  type="file"
                  fullWidth
                  variant="standard"
                />
                <Autocomplete
                  multiple
                  options={labelOptions}
                  value={labels}
                  onChange={(event, newValue) => setLabels(newValue)}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Labels"
                      placeholder="Choose Labels"
                      variant="standard"
                    />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Datetime"
                    value={datetime}
                    onChange={(value) => setDatetime(value)}
                  />
                </LocalizationProvider>
                <TextField
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
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <Button
                onClick={handleSubmit}
                type="submit"
                form="subscription-form"
              >
                POST
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </div>
      {allPosts.map(
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
                <div className="flex">
                  <p className="post-icon">✎</p>
                  <p className="post-icon">✖</p>
                </div>
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
    </>
  );
}

export default Blog;
