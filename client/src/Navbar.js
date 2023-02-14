import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";

function Navbar() {
  return (
    <div className="bg-white px-10">
      <nav className="py-6 flex justify-between rounded-xl">
        <a href="/">
          <h1 className="text-2xl font-bold px-6 hover:text-gray-600">
            Find a Classroom
          </h1>
        </a>

        <ul className="flex items-center pr-6">
          {/* <li>
            <BsFillMoonStarsFill className="cursor-pointer text-2xl" />
          </li> */}

          <li>
            {" "}
            <a
              href="/about"
              className="bg-blue-600 hover:bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-lg ml-8"
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
