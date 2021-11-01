import * as users from "../data/users_profile.json";
import * as routes from "../data/users_edges.json";

import { userDataT, CorrectPointDataT } from "../models/userData";
import { RouteDataT, CorrectRouteDataT } from "../models/routesData";

export const getPracticeData = () => {
  const correctUserArray = (users as unknown as { default: userDataT[] })
    .default;
  const currentRoutesArray = (routes as unknown as { default: RouteDataT[] })
    .default;

  const nodes: CorrectPointDataT[] = correctUserArray.map(
    (item: userDataT) => ({
      id: item.username,
      forterStatus: item.forter_status,
      isBuyer: !!item.is_buyer,
      inSeller: !!item.is_seller
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
  return {
    nodes,
    links,
  };
};
