import Barcelona from "../pictures/Barcelona.png";
import Istanbul from "../pictures/Istanbul.png";
import Berlin from "../pictures/Berlin.png";
import Lissabon from "../pictures/Lissabon.png";
import Paris from "../pictures/Paris.png";
import Amsterdam from "../pictures/Amsterdam.png";

const cities = [
  { name: "Barcelona", img: Barcelona },
  { name: "Istanbul", img: Istanbul },
  { name: "Berlin", img: Berlin },
  { name: "Lissabon", img: Lissabon },
  { name: "Paris", img: Paris },
  { name: "Amsterdam", img: Amsterdam },
];

function Startpage() {
  return (
    <>
      <section className="splash">
        <h2>YOUR NEST. YOUR STORY.</h2>
      </section>
      <section>
        <h3>Find your Nest</h3>
        <div className="search">
          <input className="search-input" type="text" placeholder="Barcelona" />
        </div>
      </section>
      <section className="grid">
        {cities.map((ele) => (
          <article>
            <div class="city-article">
                <img className="city-picture" src={ele.img} />
            </div>
            <h4>{ele.name}</h4>
          </article>
        ))}
      </section>
    </>
  );
}

export default Startpage;
