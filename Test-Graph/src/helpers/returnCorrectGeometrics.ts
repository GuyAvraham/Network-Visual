import { BoxGeometry, SphereGeometry, TetrahedronGeometry } from "three";

export default function returnCorrectGeometrics(
  inputValue: string,
  amount: number,
  nodeSize: number
) {
  switch (inputValue) {
    case "Box":
      return new BoxGeometry(
        (amount * nodeSize) / 10,
        (amount * nodeSize) / 10,
        (amount * nodeSize) / 10
      );

    case "Sphere":
      return new SphereGeometry((amount * nodeSize) / 10);
    case "Tetrahedron":
      return new TetrahedronGeometry((amount * nodeSize) / 10);
  }
}
