import React, { useState, useEffect } from "react";
import searchVideos from "./searchVideos";
import ReactPlayer from "react-player";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "../css/Navbar.css";
import Profile from "./Profile";
function Navbar(props) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("no");
  const [data, setData] = useState({
    results: [
      {
        video:
          "",
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
          "numResults=2";
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
    });
  });

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light " >
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
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
                    src={props.img}
                  />
                  {props.username}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/edit">
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

          <div className="showvideo">
          {data.results.map((item) => (
            <div className="singleVideo">
              <ReactPlayer
              width="300px"
              height="300px"
              controls
              url={item.video}
            />
            </div>
          ))}
            </div>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}

export default Navbar;
