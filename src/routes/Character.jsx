import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Character() {
  const [imageValid, setImageValid] = useState(true);

  const location = useLocation();
  const data = location.state;
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <div className="bg-gradient-to-b from-zinc-500 to-zinc-900 rounded-md text-white flex flex-col sm:flex-row overflow-hidden">
        <div className="relative overflow-hidden aspect-square sm:aspect-auto sm:h-[350px] sm:max-w-[50%] sm:order-2">
          {imageValid ? (
            <img
              src={`/images/people/${data.id + 1}.jpg`}
              onError={(e) => {
                e.target.onError = null;
                setImageValid(false);
              }}
              alt={data.name}
              width="300"
              height="300"
              className="h-full w-full sm:w-auto object-cover object-top"
            />
          ) : (
            <>
              <img
                src={"/images/people/placeholder.png"}
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
          <h2>{data.name}</h2>
          <p>Birth year: {data.birth_year}</p>
          <p>Eye color: {data.eye_color}</p>
          <p>Gender: {data.gender}</p>
          <p>Hair color: {data.hair_color}</p>
          <p>Height: {data.height}</p>
          <p>Mass: {data.mass}</p>
          <p>Skin color: {data.skin_color}</p>

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
