import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
import { Mesh, MeshLambertMaterial } from "three";

import { getPracticeData } from "../../helpers/getGraphData";
import { getCurrentUserData } from "../../helpers/getCurrentUserData";
import { returnCurrentNodeColor } from "../../helpers/getCurrentNodeColor";
import returnCorrectGeometrics from "../../helpers/returnCorrectGeometrics";
import { GraphProps } from "../../models/Graph";

import {
  CorrectRouteDataT,
  DefaultRouteT,
  PointT,
} from "../../models/routesData";

const Graph3D = ({
  setCurrentUserData,
  setIsPopupShow,
  lineWidth,
  lineColor,
  nodeSizeForBuyer,
  nodeSizeForSeller,
  nodeSizeForBuyerAndSeller,
  nodeSizeForOther,
  startFlickering,
  shapeForBuyer,
  shapeForSeller,
  shapeForBuyerAndSeller,
  shapeForOther,
  colorForBuyer,
  colorForSeller,
  colorForBuyerAndSeller,
  colorForOther,
  isFocusOnNodeNeeded,
}: GraphProps) => {
  const fgRef = useRef();
  const [isFlickering, setIsFlickering] = useState<boolean>(false);

  useEffect(() => {
    if (startFlickering) {
      setTimeout(() => setIsFlickering(!isFlickering), 100);
    } else {
      setIsFlickering(false);
    }
  }, [startFlickering, isFlickering]);

  const gData = getPracticeData();
  const returnCurrentLabel = (id: string | number | undefined) => {
    setIsPopupShow(true);
    setCurrentUserData(getCurrentUserData(id));
  };

  const returnCurrentColor = (source: PointT, target: PointT) =>
    gData.links.find(
      (item: CorrectRouteDataT) =>
        item.source === source && item.target === target
    )!;
  console.log(gData.links);

  const handleFocusOnNode = (node: any) => {
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    //@ts-ignore
    fgRef?.current.cameraPosition(
      {
        x: node.x * distRatio,
        y: node.y * distRatio,
        z: node.z * distRatio,
      }, // new position
      node, // lookAt ({ x, y, z })
      3000 // ms transition duration
    );
  };

  const commonData = {
    graphData: gData,
    linkColor: (item: DefaultRouteT) => lineColor,
    // returnCurrentColor(item.source, item.target).linkColor,
    // linkWidth: (item: DefaultRouteT) =>
    //   returnCurrentColor(item.source, item.target).dashes
    //     ? 0
    //     : returnCurrentColor(item.source, item.target).width * lineWidth,

    linkDirectionalParticles: (item: DefaultRouteT) =>
      returnCurrentColor(item.source, item.target).dashes ? 10 : 0,
    linkDirectionalParticleWidth: (item: DefaultRouteT) =>
      returnCurrentColor(item.source, item.target).dashes ? 3 : 0,
    linkDirectionalParticleSpeed: 0,
    nodeColor: (item: any) => returnCurrentNodeColor(item.forterStatus),
    onNodeClick: (item: any) => {
      returnCurrentLabel(item.id);
      if (isFocusOnNodeNeeded) {
        handleFocusOnNode(item);
      }
    },
    nodeLabel: (item: any) => item.id as string,
  };

  console.log(colorForBuyer);

  const returnCorrectGeometric = useCallback(
    (
      isBuyer: boolean,
      isSeller: boolean,
      amount: number,
      forterStatus: string,
      merchantStatus: string
    ) => {
      if (isBuyer && isSeller) {
        return new Mesh(
          returnCorrectGeometrics(
            shapeForBuyerAndSeller,
            amount,
            nodeSizeForBuyerAndSeller
          ),
          new MeshLambertMaterial({
            color: colorForBuyerAndSeller
              ? colorForBuyerAndSeller
              : returnCurrentNodeColor(forterStatus),
            transparent: true,
            opacity: 0.75,
          })
        );
      } else if (isBuyer && !isSeller) {
        return new Mesh(
          returnCorrectGeometrics(shapeForBuyer, amount, nodeSizeForBuyer),
          new MeshLambertMaterial({
            color: colorForBuyer
              ? colorForBuyer
              : returnCurrentNodeColor(forterStatus),
            transparent: true,
            opacity: 0.75,
          })
        );
      } else if (!isBuyer && isSeller) {
        return new Mesh(
          returnCorrectGeometrics(shapeForSeller, amount, nodeSizeForSeller),
          new MeshLambertMaterial({
            color: colorForSeller
              ? colorForSeller
              : returnCurrentNodeColor(forterStatus),
            transparent: true,
            opacity: 0.75,
          })
        );
      } else if (!isBuyer && !isSeller) {
        return new Mesh(
          returnCorrectGeometrics(shapeForOther, amount, nodeSizeForOther),
          new MeshLambertMaterial({
            color: colorForOther
              ? colorForOther
              : returnCurrentNodeColor(forterStatus),
            transparent: true,
            opacity: 0.75,
          })
        );
      }
    },
    [
      startFlickering,
      isFlickering,
      nodeSizeForBuyerAndSeller,
      nodeSizeForBuyer,
      nodeSizeForSeller,
      nodeSizeForOther,
      shapeForBuyer,
      shapeForSeller,
      shapeForBuyerAndSeller,
      shapeForOther,
      colorForBuyer,
      colorForSeller,
      colorForBuyerAndSeller,
      colorForOther,
    ]
  );

  return (
    <ForceGraph3D
      {...commonData}
      ref={fgRef}
      linkOpacity={1}
      linkLabel={() => `Line width: ${lineWidth}`}
      linkWidth={() => lineWidth}
      //@ts-ignore
      nodeThreeObject={(item: any) =>
        returnCorrectGeometric(
          item.isBuyer,
          item.isSeller,
          item.amount,
          item.forterStatus,
          item.merchantStatus
        )
      }
    />
  );
};

export default memo(Graph3D);
