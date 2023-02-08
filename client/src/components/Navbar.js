import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import UB_logo from "../photos/UB_logo.png";

function Navbar() {
  return (
    <div className="bg-white px-10">
      <nav className="py-6 flex justify-between rounded-xl">
        <h1 className="text-2xl font-bold px-6">Find a Classroom</h1>

        <ul className="flex items-center pr-6">
          <li>
            <BsFillMoonStarsFill className="cursor-pointer text-2xl" />
          </li>

          <li>
            {" "}
            <a
              href="#"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-md ml-8"
            >
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
