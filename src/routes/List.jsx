import { useEffect, useReducer } from "react";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

const peopleReducer = (peopleState, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...peopleState, isLoading: true };
    case "RESPONSE":
      return {
        people: [...peopleState.people, ...action.results],
        peopleNextApiUrl: action.next ? action.next : null,
        isLoading: false,
      };
    default:
      throw new Error("Should not get here!");
  }
};

function List() {
  const [peopleState, dispatch] = useReducer(peopleReducer, {
    people: [],
    peopleNextApiUrl: "",
    isLoading: false,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPeople = async () => {
      dispatch({ type: "FETCH" });
      const response = await fetch("https://swapi.dev/api/people", {
        signal: abortController.signal,
      });
      const resData = await response.json();
      dispatch({
        type: "RESPONSE",
        next: resData.next,
        results: resData.results,
      });
    };

    fetchPeople();

    return () => abortController.abort();
  }, []);

  const loadMorePeopleHandler = () => {
    const fetchMorePeople = async () => {
      dispatch({ type: "FETCH" });
      const response = await fetch(peopleState.peopleNextApiUrl);
      const resData = await response.json();
      dispatch({
        type: "RESPONSE",
        next: resData.next,
        results: resData.results,
      });
    };

    fetchMorePeople();
  };

  function getIdFromUrl(url) {
    const parts = url.split("/");
    return parts.at(-2);
  }
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {peopleState.people.map((person, key) => (
          <ListItem person={person} key={key} id={getIdFromUrl(person.url)} />
        ))}
      </ul>
      {peopleState.isLoading && <Loader />}
      {!peopleState.isLoading && peopleState.peopleNextApiUrl && (
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
