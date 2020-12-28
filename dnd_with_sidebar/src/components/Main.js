import React, { useEffect, useState } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
// const position = { x: 0, y: 0 };
const initialElements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: '3', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: '4', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: '5', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
];

const Main = () => {
  const [elements, setElements] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : initialElements
  );

  // const [elements, setElements] = useState(initialElements);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(elements));
  }, [elements]);

  console.log(elements);

  return (
    <div className="body-flow">
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStop={(e, node) => {
          console.log(node.id);
          let cloneState = [...elements];
          let newPos = cloneState.map((item) => {
            if (item?.id === node?.id) {
              return {
                ...item,
                position: node?.position,
              };
            }else{
              return item
            }
          });

          setElements(newPos);
          // if (newPos.length > 0) {
          //   setElements(cloneState);
          // }
        }}
        deleteKeyCode={46} /* 'delete'-key */
      />
    </div>
  );
};

export default Main;
