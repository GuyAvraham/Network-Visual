import React, { useState, useEffect } from "react";

import "./style.css";

import {
  NodeDataPopup,
  Graph3D,
  Graph2D,
  InputComponent,
} from "../../Components/index";

const GraphContainer = () => {
  const [currentUserData, setCurrentUserData] = useState<string>("");
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [show2DGraph, setShow2DGraph] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [nodeSize, setNodeSize] = useState<number>(1);

  useEffect(() => setIsPopupShow(false), [show2DGraph]);

  const handleChangeLinkWidth = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLineWidth(e.target.value as number);
  };

  const handleChangeNodeSize = (e: React.ChangeEvent<{ value: unknown }>) => {
    setNodeSize(e.target.value as number);
  };

  return (
    <>
      {show2DGraph ? (
        <Graph2D
          lineWidth={lineWidth}
          nodeSize={nodeSize}
          setCurrentUserData={setCurrentUserData}
          setIsPopupShow={setIsPopupShow}
        />
      ) : (
        <Graph3D
          lineWidth={lineWidth}
          nodeSize={nodeSize}
          setIsPopupShow={setIsPopupShow}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      <NodeDataPopup
        setIsPopupShow={setIsPopupShow}
        currentUserData={currentUserData}
        isPopupShow={isPopupShow}
      />

      <div className="toolsMenu">
        <div className="toolsContent">
          <button
            className="changeGraphButton"
            onClick={() => setShow2DGraph(!show2DGraph)}
          >
            {`Change graph ${show2DGraph ? "to 3D" : "to 2D"}`}
          </button>
          <InputComponent
            handleChange={handleChangeLinkWidth}
            value={lineWidth}
            type="number"
            title="Line width input"
          />
          <InputComponent
            handleChange={handleChangeNodeSize}
            value={nodeSize}
            type="number"
            title="Node size input"
          />
        </div>
      </div>
    </>
  );
};

export default GraphContainer;
