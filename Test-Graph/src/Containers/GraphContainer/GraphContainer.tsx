import React, { useState, useEffect, useMemo } from "react";

import "./style.css";

import { NodeDataPopup, Graph3D, Graph2D } from "../../Components/index";

const GraphContainer = () => {
  const [currentUserData, setCurrentUserData] = useState<string>("");
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [show2DGraph, setShow2DGraph] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(2);

  useEffect(() => setIsPopupShow(false), [show2DGraph]);

  const handleChangeLinkWidth = (e: any) => {
    setLineWidth(e.target.value);
  };

  return (
    <>
      {show2DGraph ? (
        <Graph2D
          lineWidth={lineWidth}
          setCurrentUserData={setCurrentUserData}
          setIsPopupShow={setIsPopupShow}
        />
      ) : (
        <Graph3D
          lineWidth={lineWidth}
          setIsPopupShow={setIsPopupShow}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      <NodeDataPopup
        setIsPopupShow={setIsPopupShow}
        currentUserData={currentUserData}
        isPopupShow={isPopupShow}
      />
      <input
        type="number"
        className="changeGraphButton"
        onChange={handleChangeLinkWidth}
      />
      {/* <button
        className="changeGraphButton"
        onClick={() => setShow2DGraph(!show2DGraph)}
      >
        {`Change graph ${show2DGraph ? "to 3D" : "to 2D"}`}
      </button> */}
    </>
  );
};

export default GraphContainer;
