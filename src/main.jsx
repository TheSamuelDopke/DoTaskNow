import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPage from "./pages/TaskPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App></App>,
    },
    {
      path: "/task",
      element: <TaskPage></TaskPage>,
    },
  ],
  { basename: "/DoTaskNow/" }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
