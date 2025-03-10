import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RequestPasswordReset from "../components/RequestPasswordReset ";
import ResetPassword from "../components/ResetPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import UploadRecipe from "../components/UploadRecipe";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import AboutUs from "../pages/about";
import Share from "../components/Share";

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
        path: "/about-us",
        element: <AboutUs />,
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
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/upload-recipe",
        element: <UploadRecipe />,
      },
      {
        path: "/share-recipe",
        element: <Share />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
