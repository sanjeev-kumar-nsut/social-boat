import React, { useState, useEffect } from "react";
import searchVideos from "./searchVideos";
import ReactPlayer from "react-player";

import "../css/Navbar.css";
function Navbar() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("no");
  const [data, setData] = useState({
    results: [
      {
        video:
          "https://www.youtube.com/watch?v=K7u0aNj_kKQ&list=PL8p2I9GklV47BCAjiCtuV_liN9IwAl8pM&index=52",
      },
    ],
  });
  const [isError, setIsError] = useState(200);
  useEffect(() => {
    setTimeout(() => {
      console.warn("search  value :", search);
      if (search === "") {
        console.warn("show equal to no");
        setShow("no");
      } else {
        console.warn("show equal to yes");
        setShow("yes");
        const videoUrl =
          "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=" +
          search +
          "&" +
          "numResults=3";
        setIsError(200);
        fetch(videoUrl)
          .then((result) => {
            if (!result.ok) {
              setIsError(result.status);
              throw Error(result.statusText);
            }
            return result.json();
          })
          .then((resp) => {
            console.warn("result :", resp);
            setData(resp);
            console.warn("video data :", data);
          })
          .catch((err) => {
            console.warn("error :", err.message);
          });
      }
    }, 5000);
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light " >
        <div className="container-fluid">
          <img alt="logo" className="logoimg" src="./logo.png" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
              <input
                className="form-control form-group-lg me-2"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                value={search}
                type="search"
                placeholder="Search"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <button className="btn btn-outline-primary">Search</button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-4">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    alt="user img"
                    className="userimg"
                    src="https://cdn-icons-png.flaticon.com/128/747/747376.png"
                  />
                  User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Edit
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {show === "yes" && isError != 505 && isError != 400 ? (
        <div className="showbox">
          <img
            alt="close image"
            src="./close.png"
            onClick={() => {
              setSearch("");
            }}
            className="closeimg"
          />

          {data.results.map((item) => (
            <ReactPlayer
              width="100px"
              height="100px"
              controls
              url={item.video}
            />
          ))}
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}

export default Navbar;
