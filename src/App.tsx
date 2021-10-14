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
    const radius = 10;

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
      .attr("r", radius)
      .attr("fill", () => "blue")
      .attr("stroke", "yellow");

    const ticked = () => {
      node
        .attr("cx", function (d: any) {
          return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
        })
        .attr("cy", function (d: any) {
          return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
        });

      link
        .attr("x1", function (d: any) {
          return d.source.x;
        })
        .attr("y1", function (d: any) {
          return d.source.y;
        })
        .attr("x2", function (d: any) {
          return d.target.x;
        })
        .attr("y2", function (d: any) {
          return d.target.y;
        });
    };

    const dragHandler = d3
      .drag()
      .on("start", (d, event: any) => {
        if (!d3.active(d)) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (d, event: any) => {
        console.log("DRAGING");
        console.log({ d, event });
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (d, event: any) => {
        if (!d3.active(d)) simulation.alphaTarget(0);
        d.fx = event.x;
        d.fy = event.y;
      });

    dragHandler(node as any);

    const simulation = d3
      .forceSimulation<DataSimulation>(DATA.nodes)
      .force(
        "link",
        d3
          .forceLink()
          .id((d: any) => d.name)
          .links(DATA.links)
      )
      .force("charge", d3.forceManyBody().strength(-1))
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
      <svg id="area" height={800} width={1000}></svg>
    </div>
  );
}

export default App;
