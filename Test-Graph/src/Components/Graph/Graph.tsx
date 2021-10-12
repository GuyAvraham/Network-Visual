import React, { memo } from "react";
import ForceGraph3D from "react-force-graph-3d";

import * as users from "../../data/users_profile.json";
import * as routes from "../../data/users_edges.json";

import { userDataT, CorrectPointDataT } from "../../models/userData";
import { RouteDataT, CorrectRouteDataT } from "../../models/routesData";

const Graph = () => {
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
      linkColor: item.color,
      width: item.width,
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

  const returnCurrentColor = (source: any, target: any) =>
    links.find(
      (item: CorrectRouteDataT) =>
        item.source === source && item.target === target
    )!;

  return (
    <>
      <ForceGraph3D
        graphData={gData}
        linkColor={(item) =>
          returnCurrentColor(item.source, item.target).linkColor
        }
        linkOpacity={1}
        linkWidth={(item) => returnCurrentColor(item.source, item.target).width}
      />
    </>
  );
};

export default memo(Graph);
