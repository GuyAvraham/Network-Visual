import React from "react";
import * as d3 from "d3";
import UserProfiles from "./data/users_profile.json";
import UserEdges from "./data/users_edges.json";

const nodes = UserProfiles.map((profile) => ({ name: profile.username }));

const getLinks = () => {
  const links = [];
  for (let i = 0; i < UserEdges.length; i++) {
    const userEdge = UserEdges[i];
    if (
      nodes.find((node) => node.name === userEdge.from) &&
      nodes.find((node) => node.name === userEdge.to)
    )
      links.push({
        source: userEdge.from,
        target: userEdge.to,
        width: userEdge.width,
      });
  }
  return links;
};

const links = getLinks();

const DATA = {
  nodes: nodes,
  links: links,
};

interface DataSimulation extends d3.SimulationNodeDatum {
  name: string;
}

function App() {
  React.useEffect(() => {
    const svg = d3.select("svg");
    const height = parseInt(svg.attr("height"));
    const width = parseInt(svg.attr("width"));

    console.log({ height, width });

    const link = svg
      .append("g")
      .selectAll("line")
      .data(DATA.links)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => d.width * 3) // needs to be changed to width from data
      .style("stroke", "red");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(DATA.nodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", () => "blue")
      .attr("stroke", "yellow");

    const ticked = () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    };

    const simulation = d3
      .forceSimulation<DataSimulation>(DATA.nodes)
      .force(
        "link",
        d3
          .forceLink()
          .id((d: any) => d.name)
          .links(DATA.links)
      )
      .force("charge", d3.forceManyBody().strength(-10))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <svg id="area" height={1000} width={2000}></svg>
    </div>
  );
}

export default App;
