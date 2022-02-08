import "./css/App.css";
import "./css/Profile.css";
import "./css/Videos.css";
import "./css/Footer.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Videos from "./components/Videos";
import { useEffect, useState } from "react";
import Footer from "./components/footer";

function App() {
  const [data, setData] = useState({
    profile: {
      name: "404 ERROR",
      bio: "404 ERROR",
      linkedIn: "404 ERROR",
      fb: "404 ERROR",
      instagram: "404 ERROR",
      img: "404 ERROR",
    },
  });
  const [loading, setloading] = useState(true);
  const [isError, setIsError] = useState(200);

  useEffect(() => {
    fetch(
      "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentGet?uid=nick"
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
      <Navbar username={data.profile.name} />
      <Profile data={data} loading={loading} isError={isError} />
      <Videos />
      <Footer/>
    </div>
  );
}

export default App;
