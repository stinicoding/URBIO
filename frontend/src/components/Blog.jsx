import Profile from "../pictures/Profile.png";
import Barcelona_splash from "../pictures/Barcelona_splash.jpg";
import axios from "axios";

import { useState, Fragment } from "react";
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
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"; //npm install @mui/x-date-pickers dayjs
//import usePlacesAutocomplete from "use-places-autocomplete"; //npm install use-places-autocomplete

const labelOptions = ["Viewpoint", "Sightseeing", "Architecture"];

function Blog() {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [location, setLocation] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  //const { ready, value, setValue, suggestions } = usePlacesAutocomplete();
  const [stars, setStars] = useState(3);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
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
    try {
      const response = await axios.request(options);
      setSuggestion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>MyBlog</h3>
      <div>
        <Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            + New Blog Post
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Blog Post</DialogTitle>
            <DialogContent>
              <DialogContentText>New Blog Post</DialogContentText>
              <form onSubmit={handleSubmit} id="subscription-form">
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Caption"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  label="Describe Your Journey"
                  type="text"
                  fullWidth
                  variant="standard"
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
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(value) => setDate(value)}
                  />
                  <TimePicker
                    label="Time"
                    value={time}
                    onChange={(value) => setTime(value)}
                  />
                </LocalizationProvider>
                <TextField
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  label="Location"
                />
                <List>
                  {suggestion?.map((s) => (
                    <ListItem key={s.place_id}>{s.description}</ListItem>
                  ))}
                </List>
                <Rating
                  name="simple-controlled"
                  value={stars}
                  onChange={(event, newValue) => setStars(newValue)}
                />
              </form>
              <button onClick={findPlace}>Search</button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <Button type="submit" form="subscription-form">
                POST
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </div>
      <div className="post-grid">
        <section>
          <div className="post-info">
            <img className="icon-profile" src={Profile} alt="Profile" />
            <h4>Carrer de Mallorca 401, 08013 Barcelona</h4>
            <p>03.09.25</p>
            <p>07:12PM</p>
          </div>
          <img className="post-img" src={Barcelona_splash} />
          <div className="post-labels">
            <button className="post-label">Viewpoint</button>
            <button className="post-label">Sightseeing</button>
            <button className="post-label">Architecture</button>
          </div>
          <div className="post-box">
            <p>Comments</p>
            <input type="text" placeholder="comment" />
          </div>
        </section>
        <section>
          <h4>A Perfect Viewpoint of the Sagrada Família</h4>
          <p>
            Barcelona is full of breathtaking sights, but few compare to
            catching a perfect view of the Sagrada Família. No matter how many
            times you've seen Gaudí's masterpiece, its towering spires and
            intricate façades always feel new. The basilica is constantly
            evolving, and watching it from a good viewpoint gives you a mix of
            history, architecture, and urban energy in one frame. One of the
            best ways to enjoy the view is simply to walk around the surrounding
            streets. From Plaça de Gaudí, you get a peaceful angle with the
            reflection of the basilica in the small lake. From Avinguda de
            Gaudí, the straight boulevard creates a dramatic, postcard-perfect
            corridor leading directly to the church. And if you like rooftop
            perspectives, many nearby hotels and cafés offer terraces where the
            basilica rises above the city like a surreal sculpture. Whether you
            visit early in the morning, when the light hits the Nativity façade,
            or at sunset, when the stone glows warm and golden, the Sagrada
            Família always rewards you with something unforgettable. It's not
            just a landmark—it's a view you can return to again and again, each
            time discovering a new detail or a new feeling.
          </p>
          <p>Rating: ★★★★★</p>
        </section>
      </div>
    </>
  );
}

export default Blog;
