import React, { memo, useRef, useState } from "react";
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

import {
  CorrectRouteDataT,
  DefaultRouteT,
  PointT,
} from "../../models/routesData";

interface GraphProps {
  setCurrentUserData(data: string): void;
  setIsPopupShow: any;
  lineWidth: number;
}

const Graph3D = ({
  setCurrentUserData,
  setIsPopupShow,
  lineWidth,
}: GraphProps) => {
  const fgRef = useRef();

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
    linkWidth: (item: DefaultRouteT) =>
      returnCurrentColor(item.source, item.target).dashes
        ? 0
        : returnCurrentColor(item.source, item.target).width * lineWidth,
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

  // const randomGeometric = () => {
  //   return(

  //   )
  // }

  return (
    <ForceGraph3D
      {...commonData}
      ref={fgRef}
      linkOpacity={1}
      nodeThreeObject={({ id }) =>
        new Mesh(
          // new BoxGeometry(
          //   Math.random() * 20,
          //   Math.random() * 20,
          //   Math.random() * 20
          // ),
          new BoxGeometry(
            Math.random() * 20,
            Math.random() * 20,
            Math.random() * 20
            // Math.random() * 20
          ),
          new MeshLambertMaterial({
            color: Math.round(Math.random() * Math.pow(2, 24)),
            transparent: true,
            opacity: 0.75,
          })
        )
      }
    />
  );
};

export default memo(Graph3D);
