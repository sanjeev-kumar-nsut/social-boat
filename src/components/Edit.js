import { getDefaultNormalizer } from "@testing-library/react";

import React, { useEffect, useState } from "react";
function Edit(props) {
  const { data, loading, isError ,setIsError} = props;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [fb, setFb] = useState("");
  const [instagram, setInstagram] = useState("");
  const [uid, setId] = useState("");
  const [img, setImg] = useState("");
  console.warn("name :", name);

  useEffect(() => {
    console.warn("in effect");
    setName(data.profile.name);
    console.log("name :", name);
    console.log("loading :", loading);
    setBio(data.profile.bio);
    setLinkedIn(data.profile.linkedIn);
    setFb(data.profile.fb);
    setInstagram(data.profile.instagram);
    setId(data.profile.uid);
    setImg(data.profile.img);
  }, [loading]);

  function print() {
    const formData = { uid, name, bio, linkedIn, fb, instagram, img };
    console.warn("form data :", formData);
    const putUrl = "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentPost?uid=" + uid + "&name=" + name + "&age=" + 19 + "&bio=" + bio + "&linkedIn=" + linkedIn + "&fb=" + fb + "&instagram=" + instagram + "&img=" + img;
    console.log("put url :",putUrl);
    fetch(putUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((result) => {
        if (!result.ok) {
          setIsError(result.status);
          throw Error(result.statusText);
        }
        return result.json();
      })
      .then((resp) => {
          console.log("result : put passed");
        console.warn(resp);
        alert("data updated successfully")
      })
      .catch((err) => {
          console.log("got error");
          alert(err);
        console.warn("error :", err);
      });
  }

  return (
    <div className="edit">
      {console.warn("in return")}
      <div className="editForm">
        <h1>
          Name :
          <input
            className="editInput"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </h1>
        <h1>
          Bio :
          <input
            className="editInput"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </h1>
        <h1>
          linkedIn :
          <input
            className="editInput"
            value={linkedIn}
            onChange={(e) => {
              setLinkedIn(e.target.value);
            }}
          />
        </h1>
        <h1>
          fb :
          <input
            className="editInput"
            value={fb}
            onChange={(e) => {
              setFb(e.target.value);
            }}
          />
        </h1>
        <h1>
          instagram :
          <input
            className="editInput"
            value={instagram}
            onChange={(e) => {
              setInstagram(e.target.value);
            }}
          />
        </h1>
      </div>

      <button
        className="btn btn-outline-primary"
        onClick={() => {
          print();
        }}
      >
        Save
      </button>
    </div>
  );
}

export default Edit;
