import Barcelona from "../pictures/Barcelona.png";
import Istanbul from "../pictures/Istanbul.png";
import Berlin from "../pictures/Berlin.png";
import { NavLink } from "react-router";

const cities = [
  { name: "Barcelona", img: Barcelona },
  { name: "Istanbul", img: Istanbul },
  { name: "Berlin", img: Berlin },
];

function Startpage() {
  return (
    <>
      <section className="splash">
        <h2>YOUR NEST. YOUR STORY.</h2>
      </section>
      <section>
        <h3>Find Your Nest</h3>
        <div className="search">
          <input className="search-input" type="text" placeholder="Barcelona" />
        </div>
      </section>
      <section className="grid">
        {cities.map((ele) => (
          <article key={ele.name} className="city-card">
            <div className="city-article">
              <img className="city-picture" src={ele.img} />
            </div>
            <h4>{ele.name}</h4>
          </article>
        ))}
      </section>
      <section className="flex-buttons">
        <NavLink className="button-categories" to={"/trending"}>Trending Cities</NavLink>
        <NavLink className="button-categories" to={"/"}>Trending Blogs</NavLink>
        <NavLink className="button-categories" to={"/"}>Create Your Own Story</NavLink>
      </section>
    </>
  );
}

export default Startpage;
