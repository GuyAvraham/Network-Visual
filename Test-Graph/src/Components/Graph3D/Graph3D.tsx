import React, {
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
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
import { CorrectPointDataT } from "../../models/userData";

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
  const fgRef = useRef<any>();
  const [isFlickering, setIsFlickering] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const infinitValue = true;

  console.log(isFocus);

  useEffect(() => {
    if (startFlickering) {
      setTimeout(() => setIsFlickering(!isFlickering), 100);
    } else {
      setIsFlickering(false);
    }
  }, [startFlickering, isFlickering]);
  useEffect(() => {
    fgRef.current = getPracticeData();
  }, []);

  const gData = useMemo(() => getPracticeData(), [infinitValue]);
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

    if (isFocus) {
      fgRef?.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    } else {
      fgRef?.current.zoomToFit(3000);
    }
  };

  const commonData = useMemo(
    () => ({
      linkColor: () => lineColor,
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
      onNodeClick: (item: CorrectPointDataT) => {
        if (isFocusOnNodeNeeded) {
          if ((!item.focused && isFocus) || (item.focused && !isFocus)) {
            setIsFocus(!isFocus);
            handleFocusOnNode(item);
            item.focused = !item.focused;
            returnCurrentLabel(item.id);
          }
        } else {
          returnCurrentLabel(item.id);
        }
      },

      nodeLabel: (item: any) => item.id as string,
    }),
    [gData, lineColor, fgRef, isFocus, isFocusOnNodeNeeded]
  );

  const returnCorrectGeometric = (
    isBuyer: boolean,
    isSeller: boolean,
    amount: number,
    forterStatus: string,
    focused: boolean
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
          opacity: isFocusOnNodeNeeded && !focused && !isFocus ? 0 : 0.75,
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
          opacity: isFocusOnNodeNeeded && !focused && !isFocus ? 0 : 0.75,
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
          opacity: isFocusOnNodeNeeded && !focused && !isFocus ? 0 : 0.75,
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
          opacity: isFocusOnNodeNeeded && !focused && !isFocus ? 0 : 0.75,
        })
      );
    }
  };

  return (
    <ForceGraph3D
      graphData={gData}
      {...commonData}
      ref={fgRef}
      //@ts-ignore
      linkOpacity={isFocus ? 1 : 0}
      linkLabel={() => `Line width: ${lineWidth}`}
      linkWidth={() => lineWidth}
      //@ts-ignore
      nodeThreeObject={(item: any) =>
        returnCorrectGeometric(
          item.isBuyer,
          item.isSeller,
          item.amount,
          item.forterStatus,
          item.focused
        )
      }
    />
  );
};

export default memo(Graph3D);
