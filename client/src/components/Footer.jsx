import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-400 bg-slate-800">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <img className="h-9" src={assets.favicon} alt="dummyLogoDark" />
          <p className="mt-6 text-sm">
            Create smarter with AI: write engaging articles, generate blog
            titles, design images, remove backgrounds and objects, and get your
            resume reviewed — all in one powerful platform.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-slate-400">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-slate-400 mb-5">Contact Us</h2>
            <div className="text-sm space-y-2">
              <p>Let Gratitude ai enhance your workflow.</p>
              <div className="flex items-center gap-2 pt-4">
                {/* <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                /> */}

                <button className="bg-primary w-24 h-9 text-white rounded">
                  <a
                    href="mailto:spurinruk@gmail.com"
                    className="bg-primary w-24 h-9 text-white rounded flex items-center justify-center"
                  >
                    Contact
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        © {new Date().getFullYear()}{" "}
        <a href="https://prebuiltui.com">Grats.ai</a>. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
