import Barcelona from "../pictures/Barcelona.png";
import Istanbul from "../pictures/Istanbul.png";
import Berlin from "../pictures/Berlin.png";

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
          <article key={ele.name}>
            <div className="city-article">
              <img className="city-picture" src={ele.img} />
            </div>
            <h4>{ele.name}</h4>
          </article>
        ))}
      </section>
      <section className="flex-buttons">
        <button className="button-categories">Trending Cities</button>
        <button className="button-categories">Trending Blogs</button>
        <button className="button-categories">Create Your Own Story</button>
      </section>
    </>
  );
}

export default Startpage;
