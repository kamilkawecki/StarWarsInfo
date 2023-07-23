import { useState, useEffect, useRef, useCallback } from "react";
import ListItem from "../components/ListItem"
import Loader from "../components/Loader";

function List() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [PeopleApiUrl, setPeopleApiUrl] = useState(
    "https://swapi.dev/api/people"
  );

  const shouldFetch = useRef(true);

  const fetchPeople = useCallback(
    async (url) => {
      setIsLoading(true);
      const response = await fetch(url);
      const resData = await response.json();
      if (resData.next) {
        setPeopleApiUrl(resData.next);
      } else {
        setPeopleApiUrl(null);
        setAllLoaded(true);
      }
      setPeople([...people, ...resData.results]);
      setIsLoading(false);
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

  function getIdFromUrl(url) {
    const parts = url.split('/');
    return parts.at(-2);
  }
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {people.map((person, key) => (
          <ListItem person={person} key={key} id={getIdFromUrl(person.url)} />
        ))}
      </ul>
      {isLoading && !allLoaded && (
      <Loader />
      )} 
      {!isLoading && !allLoaded && (
        <button
          type="button"
          className="border-primary border-4 py-2 px-4 rounded-xl text-primary font-bold 
        uppercase mx-auto block transition-all duration-500 hover:text-white hover:border-white"
          onClick={loadMorePeople}
        >
          Load more
        </button>
      )}
    </section>
  );
}
export default List;
