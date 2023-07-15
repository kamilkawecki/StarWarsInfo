import { useState, useEffect, useRef, useCallback } from "react";
import ListItem from "./ListItem";

function List() {
  const [people, setPeople] = useState([]);
  const [PeopleApiUrl, setPeopleApiUrl] = useState(
    "https://swapi.dev/api/people"
  );

  const shouldFetch = useRef(true);

  const fetchPeople = useCallback(
    async function fetchPeople(url) {
      const response = await fetch(url);
      const resData = await response.json();
      if (resData.next) {
        setPeopleApiUrl(resData.next);
      }
      setPeople([...people, ...resData.results]);
    },
    [people]
  );

  useEffect(() => {
    if (shouldFetch.current) {
      fetchPeople(PeopleApiUrl);
      shouldFetch.current = false;
    }
  }, [fetchPeople, PeopleApiUrl]);

  function loadMorePeople() {
    if (PeopleApiUrl) {
      fetchPeople(PeopleApiUrl);
    }
  }
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {people.map((person, key) => (
          <ListItem person={person} key={key} id={key} />
        ))}
      </ul>
      <button
        type="button"
        className="border-primary border-4 py-2 px-4 rounded-xl text-primary font-bold 
        uppercase mx-auto block transition-all duration-500 hover:text-white hover:border-white"
        onClick={loadMorePeople}
      >
        Load more
      </button>
    </section>
  );
}
export default List;
