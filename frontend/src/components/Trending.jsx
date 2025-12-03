import { useState, useEffect } from "react";
import axios from "axios";

function Trending() {
  const [cities, setCities] = useState();

  const getAllCities = async () => {
    try {
      const allCities = await axios.get(
        "http://localhost:4040/cities/getallcities"
      );
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
          <article key={idx}>
            <div className="city-article">
              <img className="city-picture" src={ele.img} />
            </div>
            <h4>{ele.name}</h4>
          </article>
        ))}
      </section>
      <section className="button-more-section">
        <button className="button-more">See More</button>
      </section>
    </>
  );
}

export default Trending;
