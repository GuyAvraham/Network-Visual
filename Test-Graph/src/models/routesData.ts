import { NodeObject } from "react-force-graph-3d";

export type RouteDataT = {
  to: string;
  from: string;
  width: number;
  color: string;
};

export type CorrectRouteDataT = {
  source: string;
  target: string;
  linkColor: string;
  width: number;
};

export type PointT = string | number | NodeObject | undefined;

export type DefaultRouteT = {
  source?: PointT;
  target?: PointT;
};
