import axios from "axios";
import widgetStyle from "./widgetStyle";

const UploadImages = (props) => {
  const setPictures = props.setPictures;
  const uploadWidget = () => {
    console.log(6, window.cloudinary);
    console.log(
      7,
      "cloud_name:",
      import.meta.env.VITE_CLOUD_NAME,
      "upload_preset:",
      import.meta.env.VITE_UPLOAD_PRESET,
      "api_key:",
      import.meta.env.VITE_CLOUD_API_KEY
    );
    // remember to add your credentials to the .env file
    window.cloudinary.openUploadWidget(
      {
        cloud_name: import.meta.env.VITE_CLOUD_NAME,
        upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
        api_key: import.meta.env.VITE_CLOUD_API_KEY,
        tags: ["user"],
        sources: ["local", "url", "camera", "image_search"],
        clientAllowedFormats: ["jpg", "png"],
        cropping: true,
        croppingAspectRatio: 16 / 9, //landscape format
        multiple: true,
        styles: widgetStyle,
      },
      (error, result) => {
        if (error) {
          console.log("Cloudinary Widget Error: ", error);
        } else {
          result.event === "queues-end" &&
            (console.log(result),
            //add new uploads to the pictures array (first unnest it, then add it)
            setPictures((prev) => [
              ...prev,
              {
                public_id: result.data.info.files[0].uploadInfo.public_id,
                url: result.data.info.files[0].uploadInfo.secure_url,
              },
            ]));
        }
      }
    );
  };

  // function to send data to server to create a new post
  return (
    <div className="flex_upload">
      {/* form to add title, description, author, date -- onchange goes to state */}
      <div className="upload">
        <p className="post-button" onClick={uploadWidget}>
          Upload Picture
        </p>
      </div>
      {/* button PUBLISH POST on click take data from state and send to server on the body -- function*/}
    </div>
  );
};

export default UploadImages;
