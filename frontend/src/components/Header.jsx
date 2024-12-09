import React from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  return (
    <header className="h-36 shadow-md bg-white  ">
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
          <div className="text-3xl cursor-pointer">
            <FaRegUserCircle />
          </div>
          <div>
            <Link
              to={"/login"}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800"
            >
              Login
            </Link>
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
            <Link to="/AddRecipe" className={linkClass}>
              <button>Add Recipe</button>
            </Link>
          </div>

          <div className=" bg-orange-700 border-b border-orange-500 border rounded-sm hover:bg-red-900  space-x-2  px-2 sm:px-6 lg:px-8 hover:scale-110 transition-all">
            <Link to="/about" className={linkClass}>
              <button>About us</button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
