import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AddRecipe from "../pages/addrecipe";
import About from "../pages/about";
import UploadRecipe from "../components/UploadRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot password",
        element: <ForgotPassword />,
      },
      {
        path: "/sign up",
        element: <SignUp />,
      },
      {
        path: "/addrecipe",
        element: <AddRecipe />,
        
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/upload-recipe",
        element: <UploadRecipe />,
      }
    ],
  },
]);

export default router;
