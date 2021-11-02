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
  const [nodeSizeForBuyer, setNodeSizeForBuyer] = useState<number>(1);
  const [nodeSizeForSeller, setNodeSizeForSeller] = useState<number>(1);
  const [nodeSizeForBuyerAndSeller, setNodeSizeBuyerAndSeller] =
    useState<number>(1);
  const [nodeSizeForOther, setNodeSizeForOther] = useState<number>(1);

  const [startFlickering, setStartFlickering] = useState<boolean>(false);

  useEffect(() => setIsPopupShow(false), [show2DGraph]);

  const handleChangeLinkWidth = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLineWidth(e.target.value as number);
  };

  const handleChangeNodeSizeForBuyer = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setNodeSizeForBuyer(e.target.value as number);
  };
  const handleChangeNodeSizeForSeller = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setNodeSizeForSeller(e.target.value as number);
  };
  const handleChangeNodeSizeForBuyerAndSeller = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setNodeSizeBuyerAndSeller(e.target.value as number);
  };
  const handleChangeNodeSizeForOther = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setNodeSizeForOther(e.target.value as number);
  };

  const commonProps = {
    lineWidth,
    nodeSizeForBuyer,
    nodeSizeForSeller,
    nodeSizeForBuyerAndSeller,
    nodeSizeForOther,
    setCurrentUserData,
    setIsPopupShow,
    startFlickering,
  };

  return (
    <>
      {show2DGraph ? (
        <Graph2D {...commonProps} />
      ) : (
        <Graph3D {...commonProps} />
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
            handleChange={handleChangeNodeSizeForBuyer}
            value={nodeSizeForBuyer}
            type="number"
            title="Node size for buyers"
          />
          <InputComponent
            handleChange={handleChangeNodeSizeForSeller}
            value={nodeSizeForSeller}
            type="number"
            title="Node size for sellers"
          />
          <InputComponent
            handleChange={handleChangeNodeSizeForBuyerAndSeller}
            value={nodeSizeForBuyerAndSeller}
            type="number"
            title="Node size for buyers and sellers"
          />
          <InputComponent
            handleChange={handleChangeNodeSizeForOther}
            value={nodeSizeForOther}
            type="number"
            title="Node size other"
          />
          <button
            className="changeGraphButton"
            onClick={() => setStartFlickering(!startFlickering)}
            disabled={!show2DGraph}
          >
            {!show2DGraph
              ? "Not available for 3D graph yet"
              : `${
                  startFlickering ? "Stop" : "Start"
                } flickering none active merchant`}
          </button>
        </div>
      </div>
    </>
  );
};

export default GraphContainer;
