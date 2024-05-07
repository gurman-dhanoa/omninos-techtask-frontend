import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import AuthLayout from "./components/AuthLayout";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from './store/store'
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        element: (
          <AuthLayout authentication={false}>
            <Auth />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:postId",
        element: <PostDetails />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
