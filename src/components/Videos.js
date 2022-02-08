import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
function Videos() {
  const [data, setData] = useState({
    results: [
      {
        video:
          "https://www.youtube.com/watch?v=K7u0aNj_kKQ&list=PL8p2I9GklV47BCAjiCtuV_liN9IwAl8pM&index=52",
      },
    ],
  });
  const [loading, setloading] = useState("true");
  const [isError, setIsError] = useState(200);
  useEffect(() => {
    fetch(
      "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=gym&numResults=10"
    )
      .then((result) => {
        if (!result.ok) {
          setIsError(result.status);
          throw Error(result.statusText);
        }
        return result.json();
      })
      .then((resp) => {
        console.warn("video result :", resp);
        console.warn("loading :", loading);
        setData(resp);
        console.warn("video data :", data);
        setloading(false);

        console.warn("loading :", loading);
      })
      .catch((err) => {
        console.warn("error :", err);
      });
  }, []);
  if (isError === 505 || isError === 4000) return <h1>{isError} Error</h1>;
  else if (loading) {
    return <h1>Loading.....</h1>;
  } else {
    return (
      <>
        {data.results.map((item) => (
          <ReactPlayer width="100px" height="100px" controls url={item.video} />
        ))}
      </>
    );
  }
}

export default Videos;
