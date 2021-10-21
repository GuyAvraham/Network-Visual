import React, { memo, useMemo, useRef, useCallback, useState } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import * as THREE from "three";

import * as users from "../../data/users_profile.json";
import * as routes from "../../data/users_edges.json";

import { userDataT, CorrectPointDataT } from "../../models/userData";
import {
  RouteDataT,
  CorrectRouteDataT,
  DefaultRouteT,
  PointT,
} from "../../models/routesData";

interface GraphProps {
  gData?: {
    nodes: CorrectPointDataT[];
    links: CorrectRouteDataT[];
  };
  returnCurrentLabel?(data: string): void;
  setCurrentUserData: any;
  setIsPopupShow: any;
}

const Graph3D = ({ setCurrentUserData, setIsPopupShow }: GraphProps) => {
  const fgRef = useRef();

  const correctUserArray = (users as unknown as { default: userDataT[] })
    .default;
  const currentRoutesArray = (routes as unknown as { default: RouteDataT[] })
    .default;

  const nodes: CorrectPointDataT[] = correctUserArray.map(
    (item: userDataT) => ({
      id: item.username,
      forterStatus: item.forter_status,
    })
  );

  const links: CorrectRouteDataT[] = currentRoutesArray
    .map((item: RouteDataT) => ({
      source: item.from,
      target: item.to,
      linkColor: "white",
      width: item.width,
      dashes: item.dashes ? true : false,
    }))
    .filter(
      (item: CorrectRouteDataT) =>
        nodes.some((i: CorrectPointDataT) => i.id === item.source) &&
        nodes.some((i: CorrectPointDataT) => i.id === item.target)
    );

  const gData = {
    nodes,
    links,
  };

  const returnCurrentLabel = (id: string | number | undefined) => {
    setIsPopupShow(true);
    setCurrentUserData(
      JSON.stringify(
        correctUserArray.find((item: userDataT) => item.username === id)!,
        null,
        2
      )
    );
  };

  const returnCurrentColor = (source: PointT, target: PointT) =>
    gData.links.find(
      (item: CorrectRouteDataT) =>
        item.source === source && item.target === target
    )!;

  const returnCurrentNodeColor = useMemo(
    () => (status: string) => {
      switch (status) {
        case "bad": {
          return "red";
        }
        case "good": {
          return "green";
        }
        case "good": {
          return "green";
        }
        case "suspicious": {
          return "orange";
        }
        default: {
          return "#1F95FF";
        }
      }
    },
    [users]
  );

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
        : returnCurrentColor(item.source, item.target).width * 2,
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

  return (
    <ForceGraph3D
      {...commonData}
      ref={fgRef}
      linkOpacity={1}
      // nodeThreeObject={({ id }: any) =>
      //   new THREE.Mesh(
      //     [
      //       new THREE.BoxGeometry(
      //         Math.random() * 20,
      //         Math.random() * 20,
      //         Math.random() * 20
      //       ),
      //       new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20),
      //       new THREE.CylinderGeometry(
      //         Math.random() * 10,
      //         Math.random() * 10,
      //         Math.random() * 20
      //       ),
      //       new THREE.DodecahedronGeometry(Math.random() * 10),
      //       new THREE.SphereGeometry(Math.random() * 10),
      //       new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2),
      //       new THREE.TorusKnotGeometry(Math.random() * 10, Math.random() * 2),
      //     ][id % 7],
      //     new THREE.MeshLambertMaterial({
      //       color: Math.round(Math.random() * Math.pow(2, 24)),
      //       transparent: true,
      //       opacity: 0.75,
      //     })
      //   )
      // }
    />
  );
};

export default memo(Graph3D);
