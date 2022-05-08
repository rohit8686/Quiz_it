import React from "react";
import { Link } from "react-router-dom";

export const Categories = () => {
  return (
    <div>
      <h1 class="text-center pt-1">Quiz Categories</h1>
      <div class="flex gap-2 category pt-1">
        <Link to="/rules" className="link">
          <div class="card card-width html flex">
            <h2>HTML</h2>
            <img
              class="badge-img"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png"
              alt="html"
            />
          </div>
        </Link>

        <Link to="/rules" className="link">
          <div class="card card-width css flex">
            <h2>CSS</h2>
            <img
              class="badge-img"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968242.png"
              alt="html"
            />
          </div>
        </Link>

        <Link to="/rules" className="link">
          <div class="card card-width js flex">
            <h2>Javascript</h2>
            <img
              class="badge-img"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
              alt="html"
            />
          </div>
        </Link>

        <Link to="/rules" className="link">
          <div class="card card-width react flex">
            <h2>React JS</h2>
            <img
              class="badge-img"
              src="https://cdn-icons-png.flaticon.com/512/1126/1126012.png"
              alt="html"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
