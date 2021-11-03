import React, { useState, useEffect } from "react";

import "./style.css";

import {
  NodeDataPopup,
  Graph3D,
  Graph2D,
  InputComponent,
  InputRowComponent,
} from "../../Components/index";

const GraphContainer = () => {
  const [currentUserData, setCurrentUserData] = useState<string>("");
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [show2DGraph, setShow2DGraph] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [isFocusOnNodeNeeded, setIsFocusOnNodeNeeded] =
    useState<boolean>(false);

  const [nodeSizeForBuyer, setNodeSizeForBuyer] = useState<number>(1);
  const [nodeSizeForSeller, setNodeSizeForSeller] = useState<number>(1);
  const [nodeSizeForBuyerAndSeller, setNodeSizeBuyerAndSeller] =
    useState<number>(1);
  const [nodeSizeForOther, setNodeSizeForOther] = useState<number>(1);

  const [colorForBuyer, setColorForBuyer] = useState<string>("");
  console.log(colorForBuyer);

  const [colorForSeller, setColorForSeller] = useState<string>("");
  console.log(colorForSeller);

  const [colorForBuyerAndSeller, setColorForBuyerAndSeller] =
    useState<string>("");
  console.log(colorForBuyerAndSeller);

  const [colorForOther, setColorForOther] = useState<string>("");
  console.log(colorForOther);

  const [shapeForBuyer, setShapeForBuyer] = useState("Sphere");

  const [shapeForSeller, setShapeForSeller] = useState("Box");

  const [shapeForBuyerAndSeller, setShapeForBuyerAndSeller] = useState("Box");

  const [shapeForOther, setShapeForOther] = useState("Tetrahedron");

  const handleOpenSelectForBuyer = (data: any) => {
    setShapeForBuyer(data);
  };
  const handleOpenSelectForSeller = (data: any) => {
    setShapeForSeller(data);
  };
  const handleOpenSelectForBuyerAndSeller = (data: any) => {
    setShapeForBuyerAndSeller(data);
  };
  const handleOpenSelectForOther = (data: any) => {
    setShapeForOther(data);
  };

  const [startFlickering, setStartFlickering] = useState<boolean>(false);

  useEffect(() => setIsPopupShow(false), [show2DGraph]);

  const handleChangeLinkWidth = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLineWidth(e.target.value as number);
  };

  const handleChangeNodeSizeForBuyer = (data: number) => {
    setNodeSizeForBuyer(data);
  };
  const handleChangeNodeSizeForSeller = (data: number) => {
    setNodeSizeForSeller(data);
  };
  const handleChangeNodeSizeForBuyerAndSeller = (data: number) => {
    setNodeSizeBuyerAndSeller(data);
  };
  const handleChangeNodeSizeForOther = (data: number) => {
    setNodeSizeForOther(data);
  };

  const handleChangeNodeColorForBuyer = (data: string) => {
    setColorForBuyer(data);
  };
  const handleChangeNodeColorForSeller = (data: string) => {
    setColorForSeller(data);
  };
  const handleChangeNodeColorForBuyerAndSeller = (data: string) => {
    setColorForBuyerAndSeller(data);
  };
  const handleChangeNodeColorForOther = (data: string) => {
    setColorForOther(data);
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
    shapeForBuyer,
    shapeForSeller,
    shapeForBuyerAndSeller,
    shapeForOther,
    colorForBuyer,
    colorForSeller,
    colorForBuyerAndSeller,
    colorForOther,
  };

  return (
    <>
      {show2DGraph ? (
        <Graph2D {...commonProps} />
      ) : (
        <Graph3D {...commonProps} isFocusOnNodeNeeded={isFocusOnNodeNeeded} />
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
          <div>
            <InputRowComponent
              sizeValue={nodeSizeForBuyer}
              colorValue={colorForBuyer}
              shapeValue={shapeForBuyer}
              title="Buyer"
              handleChangeColor={handleChangeNodeColorForBuyer}
              handleChangeShape={handleOpenSelectForBuyer}
              handleChangeSize={handleChangeNodeSizeForBuyer}
              isShapeDisabled={show2DGraph}
            />
            <InputRowComponent
              sizeValue={nodeSizeForSeller}
              colorValue={colorForSeller}
              shapeValue={shapeForSeller}
              title="Seller"
              handleChangeColor={handleChangeNodeColorForSeller}
              handleChangeShape={handleOpenSelectForSeller}
              handleChangeSize={handleChangeNodeSizeForSeller}
              isShapeDisabled={show2DGraph}
            />
            <InputRowComponent
              sizeValue={nodeSizeForBuyerAndSeller}
              colorValue={colorForBuyerAndSeller}
              shapeValue={shapeForBuyerAndSeller}
              title="Buyer and seller"
              handleChangeColor={handleChangeNodeColorForBuyerAndSeller}
              handleChangeShape={handleOpenSelectForBuyerAndSeller}
              handleChangeSize={handleChangeNodeSizeForBuyerAndSeller}
              isShapeDisabled={show2DGraph}
            />
            <InputRowComponent
              sizeValue={nodeSizeForOther}
              colorValue={colorForOther}
              shapeValue={shapeForOther}
              title="Other"
              handleChangeColor={handleChangeNodeColorForOther}
              handleChangeShape={handleOpenSelectForOther}
              handleChangeSize={handleChangeNodeSizeForOther}
              isShapeDisabled={show2DGraph}
            />
          </div>
          {/* <InputComponent
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
          /> */}
          <button
            className="changeGraphButton"
            onClick={() => setIsFocusOnNodeNeeded(!isFocusOnNodeNeeded)}
            disabled={show2DGraph}
          >
            {!show2DGraph
              ? `Tern focus on node ${isFocusOnNodeNeeded ? "Off" : "On"}`
              : "Focus on node is not available yet for 2D gparh"}
          </button>
          <button
            className="changeGraphButton"
            onClick={() => setStartFlickering(!startFlickering)}
            disabled={!show2DGraph}
          >
            {!show2DGraph
              ? "Flickering is not available for 3D graph yet"
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
