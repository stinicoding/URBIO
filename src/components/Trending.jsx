import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config.js";
import { useNavigate } from "react-router";

function Trending({ setCity }) {
  const [cities, setCities] = useState();
  const navigate = useNavigate();

  const getAllCities = async () => {
    try {
      const allCities = await axios.get(`${URL}/cities/getallcities`);
      setCities(allCities.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <>
      <section>
        <h3>Trending</h3>
      </section>
      <section className="grid">
        {cities?.map((ele, idx) => (
          <article
            key={idx}
            className="city-card"
            onClick={() => {
              setCity(ele.name);
              navigate("/groups");
            }}
          >
            <div className="city-article">
              <img className="city-picture" src={ele.img} />
            </div>
            <h4 className="city-name">{ele.name}</h4>
          </article>
        ))}
      </section>
    </>
  );
}

export default Trending;
