import React, { useEffect, useState } from "react";

function Profile(props) {
  const { data, loading, isError } = props;

  if (isError === 505 || isError === 4000) { 
    return (
      <div className="profile">
        <h1>{isError} Error</h1>
      </div>
    );
  }
  else if (loading) {
    return (
      <div className="profile">
       <h1>Loading.....</h1>
    </div>
    );
  } else {
    return (
      <div className="profile">
        <img alt="user img" src={data.profile.img} className="profileImg" />
        <h1> {data.profile.name}</h1>
        {/* <h1>age : {data.profile.age}</h1>   API not giving age value */}
        <h2> {data.profile.bio}</h2>
        <div className="socialMedia">
        <a href={data.profile.linkedIn}><img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" className="socialIcon"/></a>
        <a href={data.profile.instagram}><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" className="socialIcon"/></a>
        <a href={data.profile.fb}><img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" className="socialIcon"/></a>
                </div>
      </div>
    );
  }
}

export default Profile;
