import { useState } from "react";
import { Link } from "react-router-dom";

function ListItem(props) {
  const [imageValid, setImageValid] = useState(true);
  props.person['id'] = props.id;
  return (
    <li className="bg-gradient-to-b from-zinc-500 to-zinc-900 rounded-md overflow-hidden hover:scale-110 transition-all">
      <Link to={`/Character/${props.id + 1}`}>
        <div className="relative overflow-hidden h-[200px]">
          {imageValid ? (
            <img
              src={`images/people/${props.id + 1}.jpg`}
              onError={(e) => {
                e.target.onError = null;
                setImageValid(false);
              }}
              alt={props.person.name}
              width="300"
              height="300"
              className="h-full object-cover object-top"
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
        <div className="p-4 text-center text-white">{props.person.name}</div>
      </Link>
    </li>
  );
}

export default ListItem;
