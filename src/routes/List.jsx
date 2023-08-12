import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

function List() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [PeopleNextApiUrl, setPeopleNextApiUrl] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPeople = async () => {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/people", {
        signal: abortController.signal,
      });
      const resData = await response.json();
      if (resData.next) {
        setPeopleNextApiUrl(resData.next);
      } else {
        setPeopleNextApiUrl(null);
        setAllLoaded(true);
      }
      setPeople(resData.results);
      setIsLoading(false);
    };

    fetchPeople();

    return () => abortController.abort();
  }, []);

  const loadMorePeopleHandler = () => {
      const fetchMorePeople = async () => {
        setIsLoading(true);
        const response = await fetch(PeopleNextApiUrl);
        const resData = await response.json();
        if (resData.next) {
          setPeopleNextApiUrl(resData.next);
        } else {
          setPeopleNextApiUrl(null);
          setAllLoaded(true);
        }
        setPeople((prevPeople) => [...prevPeople, ...resData.results]);
        setIsLoading(false);
      };

      fetchMorePeople();
  }

  function getIdFromUrl(url) {
    const parts = url.split("/");
    return parts.at(-2);
  }
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {people.map((person, key) => (
          <ListItem person={person} key={key} id={getIdFromUrl(person.url)} />
        ))}
      </ul>
      {isLoading && !allLoaded && <Loader />}
      {!isLoading && !allLoaded && (
        <button
          type="button"
          className="border-primary border-4 py-2 px-4 rounded-xl text-primary font-bold 
        uppercase mx-auto block transition-all duration-500 hover:text-white hover:border-white"
          onClick={loadMorePeopleHandler}
        >
          Load more
        </button>
      )}
    </section>
  );
}
export default List;
