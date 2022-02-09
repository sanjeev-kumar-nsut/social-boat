import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
function Videos() {
  const [data, setData] = useState({
    results: [
      {
        video:
          "",
      },
    ],
  });
  const [loading, setloading] = useState("true");
  const [isError, setIsError] = useState(200);
  useEffect(() => {
    fetch(
      "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=gym&numResults=2"
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
  if (isError === 505 || isError === 4000) {
    return (
       <div className="video">
         <h1>{isError} Error</h1>
       </div>
    );
  }
  else if (loading) {
    return (
      <div className="video">
        <h1>Loading.....</h1>
      </div>
    );
  } else {
    return (
      <div className="video">
        {data.results.map((item) => (
          <div className="videoItem">
          <ReactPlayer width="500px" height="300px" controls url={item.video} />
          </div>
        ))}
      </div>
    );
  }
}

export default Videos;
