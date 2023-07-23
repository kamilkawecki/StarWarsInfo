import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function Character() {
  const [imageValid, setImageValid] = useState(true);
  const [personData, setPersonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`https://swapi.dev/api/people/${params.id}`);
      const resData = await response.json();
      setPersonData(resData);
      setIsLoading(false);
    };

    fetchData().catch(console.error);
  }, [params]);
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <div className="bg-gradient-to-b from-zinc-500 to-zinc-900 rounded-md text-white flex flex-col sm:flex-row overflow-hidden">
        <div className="relative overflow-hidden aspect-square sm:aspect-auto sm:h-[350px] sm:max-w-[50%] sm:order-2">
          {imageValid ? (
            <img
              src={`images/people/${params.id}.jpg`}
              onError={(e) => {
                e.target.onError = null;
                setImageValid(false);
              }}
              alt={personData.name}
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
          {!isLoading && (
            <>
              <h2>{personData.name}</h2>
              <p>Birth year: {personData.birth_year}</p>
              <p>Eye color: {personData.eye_color}</p>
              <p>Gender: {personData.gender}</p>
              <p>Hair color: {personData.hair_color}</p>
              <p>Height: {personData.height}</p>
              <p>Mass: {personData.mass}</p>
              <p>Skin color: {personData.skin_color}</p>
            </>
          )}

          {/* to add: films, homeworld, starships, species, vehicles */}

          <Link className="mt-auto mr-auto block" type="button" to="..">
            back
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Character;
