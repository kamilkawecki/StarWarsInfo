import { useEffect, useReducer, useState } from "react";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import useHttp from "../hooks/http";

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

const categories = ["films", "people"];

function List() {
  const [listState, dispatch] = useReducer(listReducer, {
    list: [],
    nextApiUrl: "",
    isLoading: false,
    categoryIsLoading: false,
  });
  const { sendRequest } = useHttp();

  const [category, setCategory] = useState("films");

  useEffect(() => {
    const abortController = new AbortController();

    dispatch({ type: "INITFETCH" });
    sendRequest(`https://swapi.dev/api/${category}`, {
      signal: abortController.signal,
    }).then((res) => {
      dispatch({
        type: "INITRESPONSE",
        next: res.next,
        results: res.results,
      });
    });

    return () => abortController.abort();
  }, [category, sendRequest]);

  const loadMoreHandler = () => {
    dispatch({ type: "FETCH" });
    sendRequest(listState.nextApiUrl).then((res) => {
      dispatch({
        type: "RESPONSE",
        next: res.next,
        results: res.results,
      });
    });
  };

  const getIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts.at(-2);
  };
  return (
    <section className="mx-auto max-w-5xl px-4 lg:px-0 pb-8">
      <div className="flex gap-4 justify-center mb-4">
        {categories.map((cat, key) => (
          <button
            key={key}
            disabled={listState.categoryIsLoading}
            className={`btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {!listState.categoryIsLoading && (
        <ul
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${
            category === "films" ? "lg:grid-cols-3 lg:gap-6" : "lg:grid-cols-5"
          } gap-4 mb-8`}
        >
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
      {!listState.isLoading &&
        !listState.categoryIsLoading &&
        listState.nextApiUrl && (
          <button className="btn mx-auto" onClick={loadMoreHandler}>
            Load more
          </button>
        )}
    </section>
  );
}
export default List;
