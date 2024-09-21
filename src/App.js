import React from "react";
import CameraTable from "./component/CameraTable";
import Logo from "./image/logo_wobot.webp";
import CameraProvider from "./CameraContext";

const App = () => {
  return (
    <div className="bg_color">
      <div className="wobot_img">
        <img src={Logo} alt="" />
      </div>
      <CameraProvider>
        <CameraTable />
      </CameraProvider>
    </div>
  );
};

export default App;
