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

function Trending() {
  return (
    <>
      <section>
        <h3>Trending</h3>
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
      <section className="button-more-section">
      <button className="button-more">See More</button>
      </section>
    </>
  );
}

export default Trending;
