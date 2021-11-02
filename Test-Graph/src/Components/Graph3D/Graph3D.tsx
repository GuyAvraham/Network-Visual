import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
import {
  Mesh,
  BoxGeometry,
  MeshLambertMaterial,
  SphereGeometry,
  TetrahedronGeometry,
} from "three";

import { getPracticeData } from "../../helpers/getGraphData";
import { getCurrentUserData } from "../../helpers/getCurrentUserData";
import { returnCurrentNodeColor } from "../../helpers/getCurrentNodeColor";
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
  nodeSizeForBuyer,
  nodeSizeForSeller,
  nodeSizeForBuyerAndSeller,
  nodeSizeForOther,
  startFlickering,
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
    linkColor: (item: DefaultRouteT) =>
      returnCurrentColor(item.source, item.target).linkColor,
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
      handleFocusOnNode(item);
    },
    nodeLabel: (item: any) => item.id as string,
  };

  const returnCorrectGeometric = useCallback(
    (
      isBuyer: boolean,
      isSeller: boolean,
      amount: number,
      forterStatus: string,
      merchantStatus: string
    ) => {
      console.log(amount);

      if (isBuyer && isSeller) {
        return new Mesh(
          new BoxGeometry(
            (amount * nodeSizeForBuyerAndSeller) / 10,
            (amount * nodeSizeForBuyerAndSeller) / 10,
            (amount * nodeSizeForBuyerAndSeller) / 10
          ),
          new MeshLambertMaterial({
            color: returnCurrentNodeColor(forterStatus),
            transparent: true,
            opacity: 0.75,
          })
        );
      } else if (isBuyer && !isSeller) {
        return new Mesh(
          new SphereGeometry((amount * nodeSizeForBuyer) / 10),
          new MeshLambertMaterial({
            color: returnCurrentNodeColor(forterStatus),
            transparent: true,
            opacity: 0.75,
          })
        );
      } else if (!isBuyer && isSeller) {
        return new Mesh(
          new BoxGeometry(
            (amount * nodeSizeForSeller) / 10,
            (amount * nodeSizeForSeller) / 10,
            (amount * nodeSizeForSeller) / 10
          ),
          new MeshLambertMaterial({
            color: returnCurrentNodeColor(forterStatus),
            transparent: true,
            opacity: 0.75,
          })
        );
      } else if (!isBuyer && !isSeller) {
        return new Mesh(
          new TetrahedronGeometry((amount * nodeSizeForOther) / 10),
          new MeshLambertMaterial({
            color: returnCurrentNodeColor(forterStatus),
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
    ]
  );

  return (
    <ForceGraph3D
      {...commonData}
      ref={fgRef}
      linkOpacity={1}
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
