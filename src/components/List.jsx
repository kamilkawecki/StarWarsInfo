import { useState, useEffect, useRef, useCallback } from "react";
import ListItem from "./ListItem";

function List() {
  const [people, setPeople] = useState([]);
  const [PeopleApiUrl, setPeopleApiUrl] = useState("https://swapi.dev/api/people");

  const shouldFetch = useRef(true);

  const fetchPeople = useCallback(
    async function fetchPeople(url) {
      const response = await fetch(url);
      const resData = await response.json();
      if (resData.next) {
        setPeopleApiUrl(resData.next);
      }
      setPeople([...people, ...resData.results]);
    }, [people]
  );

  useEffect(() => {
    if(shouldFetch.current) {
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
    <section className="mx-auto max-w-6xl">
      <ul className="grid grid-cols-5 gap-4 mb-8">
        {people.map((person, key) => (
          <ListItem person={person} key={key} />
        ))}
      </ul>
      <button type="button" className="bg-white py-2 px-4 rounded mx-auto block" onClick={loadMorePeople}>Load more</button>
    </section>
  );
}
export default List;
