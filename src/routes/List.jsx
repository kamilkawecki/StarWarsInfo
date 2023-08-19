import { useEffect, useReducer, useState } from "react";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

const listReducer = (listState, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...listState, isLoading: true };
    case "RESPONSE":
      return {
        list: [...listState.list, ...action.results],
        nextApiUrl: action.next ? action.next : null,
        isLoading: false,
      };
    case "INITFETCH":
      return { ...listState, categoryIsLoading: true };
    case "INITRESPONSE":
      return {
        list: [...action.results],
        nextApiUrl: action.next ? action.next : null,
        categoryIsLoading: false,
      };
    default:
      throw new Error("Should not get here!");
  }
};

function List() {
  const [listState, dispatch] = useReducer(listReducer, {
    list: [],
    nextApiUrl: "",
    isLoading: false,
    categoryIsLoading: false,
  });

  const [category, setCategory] = useState("films");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      dispatch({ type: "INITFETCH" });
      const response = await fetch(`https://swapi.dev/api/${category}`, {
        signal: abortController.signal,
      });
      const resData = await response.json();
      dispatch({
        type: "INITRESPONSE",
        next: resData.next,
        results: resData.results,
      });
    };

    fetchData();

    return () => abortController.abort();
  }, [category]);

  const loadMoreHandler = () => {
    const fetchMore = async () => {
      dispatch({ type: "FETCH" });
      const response = await fetch(listState.nextApiUrl);
      const resData = await response.json();
      dispatch({
        type: "RESPONSE",
        next: resData.next,
        results: resData.results,
      });
    };

    fetchMore();
  };

  function getIdFromUrl(url) {
    const parts = url.split("/");
    return parts.at(-2);
  }
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <div className="flex gap-4 justify-center mb-4">
        <button
          disabled={listState.categoryIsLoading}
          className={`btn ${category === "people" ? "active" : ""}`}
          onClick={() => setCategory("people")}
        >
          People
        </button>
        <button
          disabled={listState.categoryIsLoading}
          className={`btn ${category === "films" ? "active" : ""}`}
          onClick={() => setCategory("films")}
        >
          Films
        </button>
      </div>

      {!listState.categoryIsLoading && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {listState.list.map((item, key) => (
            <ListItem
              item={item}
              category={category}
              key={key}
              id={getIdFromUrl(item.url)}
            />
          ))}
        </ul>
      )}
      {(listState.isLoading || listState.categoryIsLoading) && <Loader />}
      {(!listState.isLoading && !listState.categoryIsLoading) && listState.nextApiUrl && (
        <button className="btn mx-auto" onClick={loadMoreHandler}>
          Load more
        </button>
      )}
    </section>
  );
}
export default List;
