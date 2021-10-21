import React, { memo, useMemo, useRef, useCallback, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
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
  setCurrentUserData(data: string): void;
  setIsPopupShow(data: boolean): void;
}

const NODE_R = 3;

const Graph2D = ({ setCurrentUserData, setIsPopupShow }: GraphProps) => {
  const correctUserArray = (users as unknown as { default: userDataT[] })
    .default;
  const currentRoutesArray = (routes as unknown as { default: RouteDataT[] })
    .default;
  const fgRef = useRef();

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

  const data = useMemo(() => {
    const gData = {
      nodes,
      links,
    };

    gData.links.forEach((link: CorrectRouteDataT) => {
      const a = gData.nodes.find(
        (item: CorrectPointDataT) => item.id === link.source
      )!;
      const b = gData.nodes.find(
        (item: CorrectPointDataT) => item.id === link.target
      )!;
      !a.neighbors && (a.neighbors = []);
      !b.neighbors && (b.neighbors = []);
      a.neighbors.push(b);
      b.neighbors.push(a);

      !a.links && (a.links = []);
      !b.links && (b.links = []);
      a.links.push(link);
      b.links.push(link);
    });

    return gData;
  }, []);

  //   const returnCurrentColor = (source: PointT, target: PointT) =>
  //     links.find(
  //       (item: CorrectRouteDataT) =>
  //         item.source === source && item.target === target
  //     )!;

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

  //   const handleClick = (node: any) => {
  //     const distance = 40;
  //     const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  //     @ts-ignore
  //     fgRef?.current.cameraPosition(
  //       {
  //         x: node.x * distRatio,
  //         y: node.y * distRatio,
  //         z: node.z * distRatio,
  //       }, // new position
  //       node, // lookAt ({ x, y, z })
  //       3000 // ms transition duration
  //     );
  //     @ts-ignore
  //     fgRef?.current.zoom(5, 5);
  //   };

  //   const commonData = {
  //     linkDirectionalParticleSpeed: 4,
  //     nodeColor: (item: any) => returnCurrentNodeColor(item.forterStatus),
  //     onNodeClick: (item: any) => {
  //       returnCurrentLabel(item.id);
  //       //   handleClick(item);
  //     },
  //     nodeLabel: (item: any) => item.id as string,
  //   };

  /////////
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      node.neighbors.forEach((neighbor: CorrectPointDataT) =>
        highlightNodes.add(neighbor)
      );
      node.links.forEach((link: CorrectRouteDataT) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link: any) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  const paintRing = useCallback(
    (node, ctx) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = returnCurrentNodeColor(node.forterStatus);
      ctx.fill();
    },
    [hoverNode]
  );
  ////////

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeRelSize={NODE_R}
      autoPauseRedraw={false}
      linkWidth={(link) => (highlightLinks.has(link) ? 2 : 1)}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={(link) =>
        highlightLinks.has(link) ? 4 : 0
      }
      nodeCanvasObjectMode={(node: any) =>
        highlightNodes.has(node) ? "before" : "after"
      }
      linkColor={() => "white"}
      nodeCanvasObject={paintRing}
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
      onNodeClick={(item: any) => returnCurrentLabel(item.id)}
      //   {...commonData}
      backgroundColor="#000000"
    />
  );
};

export default memo(Graph2D);
