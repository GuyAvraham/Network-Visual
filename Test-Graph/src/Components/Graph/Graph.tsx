import React, { memo } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";

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
  setCurrentUserData(data: string): void;
  setIsPopupShow(data: boolean): void;
  show2DGraph: boolean;
}

const Graph = ({
  setCurrentUserData,
  setIsPopupShow,
  show2DGraph,
}: GraphProps) => {
  const correctUserArray = (users as unknown as { default: userDataT[] })
    .default;
  const currentRoutesArray = (routes as unknown as { default: RouteDataT[] })
    .default;

  const nodes: CorrectPointDataT[] = correctUserArray.map(
    (item: userDataT) => ({
      id: item.username,
    })
  );

  const links: CorrectRouteDataT[] = currentRoutesArray
    .map((item: RouteDataT) => ({
      source: item.from,
      target: item.to,
      linkColor: 'white', // item.color,
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

  const returnCurrentColor = (source: PointT, target: PointT) =>
    links.find(
      (item: CorrectRouteDataT) =>
        item.source === source && item.target === target
    )!;

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
    nodeColor: () => "#FFFFFF",
    onNodeClick: (item: any) => returnCurrentLabel(item.id),
    nodeLabel: (item: any) => item.id as string,
  };

  return show2DGraph ? (
    <ForceGraph2D {...commonData} />
  ) : (
    <ForceGraph3D {...commonData} linkOpacity={1} />
  );
};

export default memo(Graph);
