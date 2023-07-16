import React from "react";
import ReactDOM from "react-dom/client";
import List from "./routes/List.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Character from "./routes/Character.jsx";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <List /> },
      { path: "/character/:id", element: <Character /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
