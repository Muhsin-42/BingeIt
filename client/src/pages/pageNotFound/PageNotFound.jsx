import React from "react";
import page404 from "../../assets/images/404.png";
import "./pageNotFound.scss";
function PageNotFound() {
  return (
    <div className="pageNotFound w-100 ">
      <img src={page404} alt="" />
    </div>
  );
}

export default PageNotFound;
