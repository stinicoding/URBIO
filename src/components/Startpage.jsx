import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config.js";

function Startpage() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const getAllCities = async () => {
    try {
      const allCities = await axios.get(`${URL}/cities/getallcities`);
      //console.log(allCities);
      setCities(allCities.data.data);
      setFiltered(allCities.data.data.toSpliced(3));
    } catch (error) {
      console.log(error);
    }
  };

  const filterCities = () => {
    const filter = cities.filter((city) => {
      return city.name.toLowerCase().includes(search.toLowerCase());
    });
    setFiltered(filter.toSpliced(3));
  };

  useEffect(() => {
    getAllCities();
  }, []);

  useEffect(() => {
    if (search) {
      filterCities();
    }
  }, [search]);

  return (
    <>
      <section className="splash">
        <h2>YOUR NEST. YOUR STORY.</h2>
      </section>
      <section>
        <h3>Find Your Nest</h3>
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Barcelona"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>
      <section className="grid">
        {filtered.map((ele) => (
          <article key={ele.name} className="city-card">
            <div className="city-article">
              <img className="city-picture" src={ele.img} />
            </div>
            <h4>{ele.name}</h4>
          </article>
        ))}
      </section>
      {/*
      <section className="flex-buttons">
        <NavLink className="button-categories" to={"/trending"}>
          Trending Cities
        </NavLink>
        <NavLink className="button-categories" to={"/"}>
          Trending Blogs
        </NavLink>
        <NavLink className="button-categories" to={"/"}>
          Create Your Own Story
        </NavLink>
      </section>
      */}
    </>
  );
}

export default Startpage;
