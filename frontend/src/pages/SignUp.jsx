import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import mealSignup from "../assets/foods/mealSignup.jpg";
import imageTobase64 from "../helpers/imageTobase64";
import summaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.password === data.confirmPassword) {
        const dataResponse = await fetch(summaryApi.signUp.url, {
          method: summaryApi.signUp.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataApi = await dataResponse.json();
        console.log(dataApi); // Debug response

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        } else if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } else {
        toast.error("Passwords do not match!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4 flex justify-center basis-auto ">
        <div className="w-full md:max-w-3xl  hidden md:block">
          <img src={mealSignup} className="bg-cover h-full" alt="meal " />
        </div>
        <div className=" bg-white p-2 py-5 w-full max-w-lg">
          <div className="w-20 h-20 mx-auto  overflow-hidden  relative rounded-full ">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs text-black bg-opacity-70 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 p-2">
                  Upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-4">
            <div className="grid">
              <label>Name</label>
              <div className="bg-slate-200 p-2 my-4">
                <input
                  type="text"
                  className="w-fu
                        ll h-full bg-transparent outline-none"
                  placeholder="enter name "
                  name="name"
                  value={data.name}
                  required
                  onChange={handleOnChange}
                />
              </div>
            </div>
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
                  required
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
                  required
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer ml-auto"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label> Confirm Password</label>
              <div className="bg-slate-200 p-2 flex my-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-fu
                        ll h-full bg-transparent outline-none"
                  placeholder="enter password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer ml-auto"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white px-5 py-5 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Sign up
            </button>
          </form>
          <p className="my-4">
            {" "}
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-red-500 hover:text-red-300  hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
