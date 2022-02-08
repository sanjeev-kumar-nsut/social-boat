import React, { useEffect, useState } from "react";

function Profile(props) {
  const { data, loading, isError } = props;

  if (isError === 505 || isError === 4000) return <h1>{isError} Error</h1>;
  else if (loading) {
    return <h1>Loading.....</h1>;
  } else {
    return (
      <>
        <img alt="user img" src={data.profile.img} className="profileImg" />
        <h1>Name : {data.profile.name}</h1>
        {/* <h1>age : {data.profile.age}</h1>   API not giving age value */}
        <h1>bio : {data.profile.bio}</h1>
        <h1>linkedIn : {data.profile.linkedIn}</h1>
        <h1>Name : {data.profile.fb}</h1>
        <h1>fb : {data.profile.instagram}</h1>
      </>
    );
  }
}

export default Profile;
