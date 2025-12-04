import Profile from "../pictures/Profile.png";
import axios from "axios";
import URL from "../config.js";
import renderComments from "../utils/renderComments";
import labelOptions from "../data/labelOptions";
import UploadImages from "../utils/UploadImages";

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
  Snackbar,
} from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker, //combines date and time picker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"; //npm install @mui/x-date-pickers dayjs
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function Blog({ owner }) {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [datetime, setDatetime] = useState(dayjs());
  const [location, setLocation] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [postId, setPostId] = useState("");
  const [alert, setAlert] = useState(false);

  //console.log(datetime.format())
  //console.log(allPosts); //outside of the function so the state is updated
  //console.log(comments);
  //console.log(pictures);

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
      await axios.post(`${URL}/posts/newpost`, {
        owner: owner,
        caption: caption,
        description: description,
        labels: labels,
        datetime: datetime.format(),
        location: location,
        pictures: pictures,
        rating: rating,
        comments: comments,
      });
      await displayPosts()
    } catch (error) {
      console.log(error);
    }
  };

  const displayPosts = async () => {
    try {
      //post function, because get will pass the email in the url
      const response = await axios.post(`${URL}/posts/getposts`, {
        owner: owner,
      });
      //console.log(response.data.data);
      let modified = response.data.data.map((post) => {
        //unnest each post, add currentPicture index and store it all in an object
        return { ...post, currentPicture: 0 };
      });
      setAllPosts(modified);
    } catch (error) {
      console.log(error);
    }
  };

  //show the current clicked picture as the main picture of the post
  const switchIndex = (pic_idx, post_idx) => {
    let newArr = structuredClone(allPosts);
    newArr[post_idx].currentPicture = pic_idx;
    setAllPosts(newArr);
  };

  const editPost = async (post_id) => {
    try {
      await setOpen(true);
      const response = await axios.get(`${URL}/posts/getpost/${post_id}`);
      const res = response.data.data;
      //console.log(res);
      setCaption(res?.caption);
      setDescription(res?.description);
      setLabels(res?.labels);
      setDatetime(dayjs(res?.datetime));
      setPictures(res?.pictures);
      setLocation(res?.location);
      setRating(res?.rating);
      setUpdate(true);
      setPostId(post_id);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (post_id) => {
    try {
      await axios.patch(`${URL}/posts/updatepost`, {
        post_id: post_id,
        caption: caption,
        description: description,
        labels: labels,
        datetime: datetime.format(),
        location: location,
        pictures: pictures,
        rating: rating,
      });
      await displayPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (post_id) => {
    //console.log(post_id)
    try {
      const response = await axios.delete(`${URL}/posts/deletepost/${post_id}`);
      //console.log(response.data.data);
      setAlert(true);
      setTimeout(() => {
        displayPosts();
        setAlert(false);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    if (update) {
      updatePost(postId);
    } else {
      savePost();
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
          <div>
            <h4>Create your first Post!</h4>
          </div>
        )}
        <Fragment>
          <div className="center">
            <Button
              className="button-mui"
              variant="outlined"
              onClick={handleClickOpen}
            >
              ✚ New Blog Post
            </Button>
            {allPosts.length < 1 && <div className="screen"></div>}
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
                <UploadImages required setPictures={setPictures} />
                {pictures.map((pic) => (
                  <p className="upload-url">{`${pic.url.slice(0, 70)} ...`}</p>
                ))}
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
                  required
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
                  icon={<StarIcon style={{ color: "#E86B92", fontSize: 18 }} />}
                  emptyIcon={<StarBorderIcon style={{ fontSize: 18 }} />}
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
                SAVE
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </div>
      {allPosts.map(
        (
          post,
          post_idx //map without {} or return to actually render the posts
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
                src={post.pictures[post.currentPicture]?.url}
              />
              <div className="post-img-small-overview">
                {post.pictures.map((pic, pic_idx) => (
                  //? before url to update only the posts with several pictures (without it the other posts would crash)
                  <img
                    key={pic.public_id}
                    className="post-img-small"
                    src={pic?.url}
                    onClick={() => switchIndex(pic_idx, post_idx)}
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
                <div className="flex">
                  <p className="post-icon" onClick={() => editPost(post._id)}>
                    ✎
                  </p>
                  <p className="post-icon" onClick={() => deletePost(post._id)}>
                    ✖
                  </p>
                  {alert && (
                    <div>
                      <Snackbar
                        open={alert}
                        message="Post successfully deleted"
                      />
                    </div>
                  )}
                </div>
              </div>
              <p>{post.description}</p>
              <div className="post-rating">
                <p>Rating: </p>
                <Rating
                  icon={<StarIcon style={{ color: "#E86B92", fontSize: 18 }} />}
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
    </>
  );
}

export default Blog;
