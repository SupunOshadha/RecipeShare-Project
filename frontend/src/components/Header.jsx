import React, { useState } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("userheader", user);
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  return (
    <header className="h-36 shadow-md bg-white ">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="hidden md:block">
          <Link to={"/"}>
            <Logo w={400} h={300} />
          </Link>
        </div>
        <div className="md:hidden">
          <Link to={"/"}>
            <Logo w={200} h={200} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2 focus-within:shadow-md ">
          <input
            type="text"
            placeholder="search recipe here ..."
            className="w-full outline-none  "
          />
          <div className="text-lg min-w-[50px]  h-8 bg-red-600  flex items-center justify-center rounded-r">
            <CiSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer relative flex">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="text-xl whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <nav className="text-white -mt-11">
        <div
          className="mx-auto max-w-md flex h-10 items-center    
        "
        >
          <div className=" bg-orange-700 border-b border-orange-500 border rounded-sm hover:bg-red-900  space-x-2  px-2 sm:px-6 lg:px-8 hover:scale-110 transition-all">
            <Link to={"/"} className={linkClass}>
              <button>Home</button>
            </Link>
          </div>

          <div className=" bg-orange-700 border-b border-orange-500 border rounded-sm hover:bg-red-900  space-x-2  px-2 sm:px-6 lg:px-8 hover:scale-110 transition-all">
            <Link to="/upload-recipe" className={linkClass}>
              <button>Add Recipe</button>
            </Link>
          </div>

          <div className=" bg-orange-700 border-b border-orange-500 border rounded-sm hover:bg-red-900  space-x-2  px-2 sm:px-6 lg:px-8 hover:scale-110 transition-all">
            <Link to="/about-us" className={linkClass}>
              <button>About us</button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
