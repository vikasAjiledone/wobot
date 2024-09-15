import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import CameraTable from "./CameraTable";

const CemaraData = () => {
  return (
    <div className="camera_body">
      <div className="camera_heading">
        <div className="heading">
          <h2>Cameras</h2>
          <p className="cameras_tag">Manages your cameras here.</p>
        </div>
        <div className="search_cameras">
          <input type="text" placeholder="search" />
          <span className="search_icon">
            <IoSearchOutline />
          </span>
        </div>
      </div>
      <CameraTable/>
    </div>
  );
};

export default CemaraData;
