import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-200">
      <div className="conatainer mx-auto p-4">
        <p className="text-center font-bold">
          Developed by{" "}
          <span className="text-red-600 text-xl " title="university group">
            Proxima Warriors
          </span>
        </p>
        <p className="text-center font-bold">&copy; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
