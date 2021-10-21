import React, { useState, useEffect } from "react";

import * as users from "../../data/users_profile.json";
import * as routes from "../../data/users_edges.json";

import { userDataT, CorrectPointDataT } from "../../models/userData";
import {
  RouteDataT,
  CorrectRouteDataT,
  DefaultRouteT,
  PointT,
} from "../../models/routesData";

import "./style.css";

import { NodeDataPopup, Graph3D, Graph2D } from "../../Components/index";

const GraphContainer = () => {
  const [currentUserData, setCurrentUserData] = useState<string>("");
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [show2DGraph, setShow2DGraph] = useState<boolean>(false);

  useEffect(() => setIsPopupShow(false), [show2DGraph]);

  return (
    <>
      {show2DGraph ? (
        <Graph2D
          setCurrentUserData={setCurrentUserData}
          setIsPopupShow={setIsPopupShow}
        />
      ) : (
        <Graph3D
          setIsPopupShow={setIsPopupShow}
          setCurrentUserData={setCurrentUserData}
        />
      )}
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
