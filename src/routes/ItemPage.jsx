import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function ItemPage() {
  const [imageValid, setImageValid] = useState(true);
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const location = useLocation();
  const category = location.pathname.split("/").at(-2);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/${category}/${params.id}`
      );
      const resData = await response.json();
      setItemData(resData);
      setIsLoading(false);
    };

    fetchData().catch(console.error);
  }, [params, category]);

  const itemParams = (cat) => {
    if (cat === "people") {
      return (
        <>
          <h2>{itemData.name}</h2>
          <p>Birth year: {itemData.birth_year}</p>
          <p>Eye color: {itemData.eye_color}</p>
          <p>Gender: {itemData.gender}</p>
          <p>Hair color: {itemData.hair_color}</p>
          <p>Height: {itemData.height}</p>
          <p>Mass: {itemData.mass}</p>
          <p>Skin color: {itemData.skin_color}</p>
        </>
      );
    } else if (cat === "films") {
      return (
        <>
          <h2>{itemData.title}</h2>
          <p>Episode: {itemData.episode_id}</p>
          <p>Release date: {itemData.release_date}</p>
          <p>Director: {itemData.director}</p>
          <p>Producer: {itemData.producer}</p>
        </>
      );
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <div className="bg-gradient-to-b from-zinc-500 to-zinc-900 rounded-md text-white flex flex-col sm:flex-row overflow-hidden">
        <div className="relative overflow-hidden aspect-square sm:aspect-auto sm:h-[350px] sm:max-w-[50%] sm:order-2">
          {imageValid ? (
            <img
              src={`images/${category}/${params.id}.jpg`}
              onError={(e) => {
                e.target.onError = null;
                setImageValid(false);
              }}
              alt={
                category === "people"
                  ? itemData.name
                  : category === "films"
                  ? itemData.title
                  : ""
              }
              width="300"
              height="300"
              className="h-full w-full sm:w-auto object-cover object-top"
            />
          ) : (
            <>
              <img
                src={"images/people/placeholder.png"}
                alt="placeholder"
                width="300"
                height="300"
              />
              <span className="absolute block left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white font-bold text-xl">
                No Image
              </span>
            </>
          )}
        </div>
        <div className="py-4 px-8 flex flex-col flex-grow items-end sm:order-1">
          {isLoading && <Loader />}
          {!isLoading && itemParams(category)}

          <Link className="mt-auto mr-auto block" type="button" to="..">
            back
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ItemPage;
