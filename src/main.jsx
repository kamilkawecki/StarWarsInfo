import React from "react";
import ReactDOM from "react-dom/client";
import List from "./routes/List.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import ItemPage from "./routes/ItemPage.jsx";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <List /> },
      { path: "/people/:id", element: <ItemPage /> },
      { path: "/films/:id", element: <ItemPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
