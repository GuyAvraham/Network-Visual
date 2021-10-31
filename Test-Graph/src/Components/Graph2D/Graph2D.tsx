import React, { memo, useMemo, useRef, useCallback, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { Mesh, BoxGeometry, MeshLambertMaterial, CircleGeometry } from "three";

import { getPracticeData } from "../../helpers/getGraphData";
import { getCurrentUserData } from "../../helpers/getCurrentUserData";
import { returnCurrentNodeColor } from "../../helpers/getCurrentNodeColor";

import { CorrectPointDataT } from "../../models/userData";
import { CorrectRouteDataT } from "../../models/routesData";

interface GraphProps {
  setCurrentUserData(data: string): void;
  setIsPopupShow(data: boolean): void;
  lineWidth: any;
}

const NODE_R = 3;

const Graph2D = ({
  setCurrentUserData,
  setIsPopupShow,
  lineWidth,
}: GraphProps) => {
  const fgRef = useRef();

  const data = useMemo(() => {
    const gData = getPracticeData();

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
    setCurrentUserData(getCurrentUserData(id));
  };

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
    //   nodeCanvasObject={paintRing}
    // nodeCanvasObject={new Mesh(
    //     // new BoxGeometry(
    //     //   Math.random() * 20,
    //     //   Math.random() * 20,
    //     //   Math.random() * 20
    //     // ),
    //     new CircleGeometry(
    //       Math.random() * 20,
    //       Math.random() * 20,
    //       Math.random() * 20
    //       // Math.random() * 20
    //     ),
    //     new MeshLambertMaterial({
    //       color: Math.round(Math.random() * Math.pow(2, 24)),
    //       transparent: true,
    //       opacity: 0.75,
    //     }))
    // }
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
      onNodeClick={(item: any) => returnCurrentLabel(item.id)}
      //   {...commonData}
      backgroundColor="#000000"
      
    //   nodeThreeObject={({ id }) =>
    //     new Mesh(
    //       // new BoxGeometry(
    //       //   Math.random() * 20,
    //       //   Math.random() * 20,
    //       //   Math.random() * 20
    //       // ),
    //       new CircleGeometry(
    //         Math.random() * 20
    //         // Math.random() * 20,
    //         // Math.random() * 20
    //       ),
    //       new MeshLambertMaterial({
    //         color: Math.round(Math.random() * Math.pow(2, 24)),
    //         transparent: true,
    //         opacity: 0.75,
    //       })
    //     )
    //   }
    />
  );
};

export default memo(Graph2D);
