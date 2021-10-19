import React, { useState } from "react";
import "./style.css";

import { NodeDataPopup, Graph } from "../../../Components/index";

const GraphContainer = () => {
  const [currentUserData, setCurrentUserData] = useState<string>("");
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [show2DGraph, setShow2DGraph] = useState<boolean>(false);

  return (
    <>
      <Graph
        setCurrentUserData={setCurrentUserData}
        setIsPopupShow={setIsPopupShow}
        show2DGraph={show2DGraph}
      />
      <NodeDataPopup
        setIsPopupShow={setIsPopupShow}
        currentUserData={currentUserData}
        isPopupShow={isPopupShow}
      />
      <button
        className="changeGraphButton"
        onClick={() => setShow2DGraph(!show2DGraph)}
      >
        {`Change graph ${show2DGraph ? "to 3D" : "to 2D"}`}
      </button>
    </>
  );
};

export default GraphContainer;
