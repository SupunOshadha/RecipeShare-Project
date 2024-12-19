import React, { useState } from "react";
import { toast } from "react-toastify";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleRequestToken = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(
          data.message || "Password reset link sent to your email."
        );
      } else {
        toast.error(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="request-reset">
      <form
        onSubmit={handleRequestToken}
        className="flex flex-row justify-center gap-4 "
      >
        <div className=" bg-white px-4 py-5 w-full max-w-3xl mt-10">
          <div className="grid">
            <label>Email</label>
            <div className="bg-slate-200 p-2 my-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-full bg-transparent outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-5 w-full max-w-[250px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700 "
            >
              Send Reset Link
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RequestPasswordReset;
