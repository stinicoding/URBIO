const URL = window.location.href.includes("localhost")
  ? "http://localhost:4040/api"
  : "https://urbio-city.vercel.app/api";

export default URL;
