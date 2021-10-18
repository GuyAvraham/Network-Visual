import React, { memo, useState, useMemo } from "react";
import ForceGraph3D from "react-force-graph-3d";

import { NodeDataPopup } from "../index";

import * as users from "../../data/users_profile.json";
import * as routes from "../../data/users_edges.json";

import { userDataT, CorrectPointDataT } from "../../models/userData";
import {
  RouteDataT,
  CorrectRouteDataT,
  DefaultRouteT,
  PointT,
} from "../../models/routesData";

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

  const [currentUserData, setCurrentUserData] = useState<string>("");
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);

  const links: CorrectRouteDataT[] = useMemo(
    () =>
      currentRoutesArray
        .map((item: RouteDataT) => ({
          source: item.from,
          target: item.to,
          linkColor: item.color,
          width: item.width,
          dashes: item.dashes ? true : false,
        }))
        .filter(
          (item: CorrectRouteDataT) =>
            nodes.some((i: CorrectPointDataT) => i.id === item.source) &&
            nodes.some((i: CorrectPointDataT) => i.id === item.target)
        ),
    [currentRoutesArray, nodes]
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

  const Graph3d = useMemo(
    () => (
      <ForceGraph3D
        graphData={gData}
        linkColor={(item: DefaultRouteT) =>
          returnCurrentColor(item.source, item.target).linkColor
        }
        linkOpacity={1}
        linkWidth={(item: DefaultRouteT) =>
          returnCurrentColor(item.source, item.target).dashes
            ? 0
            : returnCurrentColor(item.source, item.target).width * 4
        }
        linkDirectionalParticles={(item: DefaultRouteT) =>
          returnCurrentColor(item.source, item.target).dashes ? 10 : 0
        }
        linkDirectionalParticleWidth={(item: DefaultRouteT) =>
          returnCurrentColor(item.source, item.target).dashes ? 3 : 0
        }
        linkDirectionalParticleSpeed={0}
        nodeColor={() => "#1F95FF"}
        onNodeClick={(item) => returnCurrentLabel(item.id)}
        nodeLabel={(item) => item.id as string}
      />
    ),
    [users, routes]
  );

  return (
    <>
      {Graph3d}
      <NodeDataPopup
        setIsPopupShow={setIsPopupShow}
        currentUserData={currentUserData}
        isPopupShow={isPopupShow}
      />
    </>
  );
};

export default memo(Graph);
