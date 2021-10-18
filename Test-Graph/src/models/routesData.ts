import { NodeObject } from "react-force-graph-3d";

export type RouteDataT = {
  to: string;
  from: string;
  width: number;
  color: string;
  dashes?: string;
};

export type CorrectRouteDataT = {
  source: string;
  target: string;
  linkColor: string;
  width: number;
  dashes: boolean;
};

export type PointT = string | number | NodeObject | undefined;

export type DefaultRouteT = {
  source?: PointT;
  target?: PointT;
};
