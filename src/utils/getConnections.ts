import userEdges from "../data/users_edges.json";

export const getConnections = () => {
  const links = [];
  for (let index = 0; index < userEdges.length; index++) {
    const userEdge = userEdges[index];
    links.push({ source: userEdge.from, target: userEdge.to });
  }
};
