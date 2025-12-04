const URL = window.location.href.includes("localhost")
  ? "http://localhost:4040/api"
  : "https://wallpapers-by-alex.vercel.app";

export default URL;
