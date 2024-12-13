import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="text-6xl text-red-700 font-bold text-center">
        WELCOME TO HOMEPAGE BUDDY
      </div>
      <Link to={"/about"}>
        <button>GO TO ABOUT PAGE</button>
      </Link>
    </>
  );
}
