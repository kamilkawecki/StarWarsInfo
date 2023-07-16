import React from "react";
import ReactDOM from "react-dom/client";
import List from "./routes/List.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Character from "./routes/Character.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/StarWarsInfo",
    element: <RootLayout />,
    children: [
      { path: "/StarWarsInfo", element: <List /> },
      { path: "/StarWarsInfo/Character/:id", element: <Character /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
