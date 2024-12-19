import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RequestPasswordReset from "../components/RequestPasswordReset ";
import ResetPassword from "../components/ResetPassword";
import SignUp from "../pages/SignUp";
import AddRecipe from "../pages/addrecipe";
import About from "../pages/about";

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
        path: "/forgot-password",
        element: <RequestPasswordReset />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/sign-up",
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
    ],
  },
]);

export default router;
