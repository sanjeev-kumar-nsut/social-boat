import React, { useEffect, useState } from "react";

function Profile(props) {
  const { data, loading, isError } = props;

  if (isError === 505 || isError === 4000) { 
    return (
      <div className="profile">
        <h1>{isError} Error</h1>;
      </div>
    );
  }
  else if (loading) {
    return (
      <div className="profile">
       <h1>Loading.....</h1>;
    </div>
    );
  } else {
    return (
      <div className="profile">
        <img alt="user img" src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png" className="profileImg" />
        <h1>Name : {data.profile.name}</h1>
        {/* <h1>age : {data.profile.age}</h1>   API not giving age value */}
        <h1>bio : {data.profile.bio}</h1>
        <h1>linkedIn : {data.profile.linkedIn}</h1>
        <h1>Name : {data.profile.fb}</h1>
        <h1>fb : {data.profile.instagram}</h1>
      </div>
    );
  }
}

export default Profile;
