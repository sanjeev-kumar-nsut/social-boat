import "./css/App.css";
import "./css/Profile.css";
import "./css/Videos.css";
import "./css/Footer.css";
import "./css/Edit.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Videos from "./components/Videos";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Edit from "./components/Edit";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [data, setData] = useState({
    profile: {
      name: "ERROR",
      bio: "ERROR",
      linkedIn: "ERROR",
      fb: "ERROR",
      instagram: "ERROR",
      img: "ERROR",
    },
  });
  const [loading, setloading] = useState(true);
  const [isError, setIsError] = useState(200);

  useEffect(() => {
    fetch(
      "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentGet?uid=sky"
    )
      .then((result) => {
        if (!result.ok) {
          setIsError(result.status);
          throw Error(result.statusText);
        }
        return result.json();
      })
      .then((resp) => {
        console.warn(" profile result :", resp);
        console.warn("loading :", loading);
        setData(resp);
        console.warn("data :", data.profile);
        setloading(false);

        console.warn("loading :", loading);
      })
      .catch((err) => {
        console.warn("error :", err);
      });
  }, []);

  return (
    <div>
      <Navbar username={data.profile.name} img={data.profile.img} />

      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
              <Profile data={data} loading={loading} isError={isError} />
              <Videos />
              </>
            }
          />
          <Route  path="/edit" element = {
          <Edit data={data} loading={loading} isError={isError} setIsError = {setIsError} />
          }></Route>
          <Route path="*" element = {<h1>There is nothing here !!!</h1>}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
