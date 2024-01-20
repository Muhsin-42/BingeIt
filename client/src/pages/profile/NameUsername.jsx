import React from "react";

function NameUsername({ friend }) {
  return (
    <div className="left ">
      <h1 className="name mb-0 text-white">
        {friend ? friend.name : "loading"}
      </h1>
      <h1 className="name mb-0 text-white">
        @{friend ? friend.username : "loading"}
      </h1>
    </div>
  );
}

export default React.memo(NameUsername);
