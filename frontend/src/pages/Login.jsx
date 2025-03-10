import React, { useContext, useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import mealLoging from "../assets/foods/meallog.jpg";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(summaryApi.signIn.url, {
      method: summaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4 flex justify-center basis-auto ">
        <div className="w-full md:max-w-2xl hidden md:block ">
          <img src={mealLoging} className="bg-cover h-full " alt="meal " />
        </div>
        <div className=" bg-white p-2 py-5 w-full max-w-lg ">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-4">
            <div className="grid">
              <label>Email</label>
              <div className="bg-slate-200 p-2 my-4">
                <input
                  type="email"
                  className="w-fu
                        ll h-full bg-transparent outline-none"
                  placeholder="enter email "
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <label>Password</label>
              <div className="bg-slate-200 p-2 flex my-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-fu
                        ll h-full bg-transparent outline-none"
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer ml-auto"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block ml-auto hover:underline w-fit hover:text-red-600 "
              >
                Forgot password
              </Link>
            </div>

            <button className="bg-red-600 text-white px-5 py-5 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-4">
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-500 hover:text-red-300  hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
