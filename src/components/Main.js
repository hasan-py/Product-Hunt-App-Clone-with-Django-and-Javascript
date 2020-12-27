import React, { useEffect, useState } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
const position = { x: 0, y: 0 };
const initialElements = [
  {
    id: "1",
    data: { label: "Node 1" },
    position,
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position,
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position,
  },
  {
    id: "4",
    data: { label: "Node 4" },
    position,
  },
  {
    id: "5",
    data: { label: "Node 5" },
    position,
  },
  {
    id: "6",
    data: { label: "Node 6" },
    position,
  },
];
const Main = () => {
  const [elements, setElements] = useState(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : initialElements);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
    
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(elements))
  }, [elements])

  console.log(elements)

  return (
    <div className="body-flow">
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      />
    </div>
  );
};

export default Main;
