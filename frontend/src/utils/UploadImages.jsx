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
          if (result.event === "success") {
            let imageUrl = result.info.secure_url;
            // If cropping occurred, the coordinates are in result.info.coordinates.custom[0]
            if (
              result.info.coordinates &&
              result.info.coordinates.custom &&
              result.info.coordinates.custom[0]
            ) {
              const [x, y, width, height] = result.info.coordinates.custom[0];
              // Construct the transformation string
              const cropParams = `c_crop,x_${x},y_${y},w_${width},h_${height}`;
              // Inject the transformation into the URL after "/upload/"
              imageUrl = imageUrl.replace("/upload/", `/upload/${cropParams}/`);
            }

            setPictures((prev) => [
              ...prev,
              {
                public_id: result.info.public_id,
                url: imageUrl,
              },
            ]);
          }
        }
      }
    );
  };

  // function to send data to server to create a new post
  return (
    <div className="flex_upload">
      {/* form to add title, description, author, date -- onchange goes to state */}
      <div className="upload">
        <span id="button-upload" onClick={uploadWidget}>
          Upload Picture
        </span>
      </div>
      {/* button PUBLISH POST on click take data from state and send to server on the body -- function*/}
    </div>
  );
};

export default UploadImages;
