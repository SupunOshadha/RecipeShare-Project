import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.password }),
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Password reset successfully.");
        navigate("/login");
      } else {
        toast.error(result.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="reset-password">
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <div className=" bg-white px-4 py-5 w-full max-w-3xl mt-10 mx-auto">
          <label>New Password</label>
          <div className="grid">
            <div className="bg-slate-200 p-2 my-4">
              <input
                className="w-full h-full bg-transparent outline-none"
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
              />
            </div>
            <label>Confirm Password</label>
            <div className="bg-slate-200 p-2 my-4">
              <input
                className="w-full h-full bg-transparent outline-none"
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto bg-red-600 rounded-full text-white w-full px-5 py-5 hover:scale-110 block max-w-[250px]  mt-6 transition-all hover:bg-red-700"
          >
            Reset Password
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
