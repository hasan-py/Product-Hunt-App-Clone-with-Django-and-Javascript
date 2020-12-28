import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from "react-flow-renderer";
import Sidebar from "./Sidebar";

const initialElements = [
  { id: new Date().getTime(), data: { label: "Node 2" }, position: { x: 100, y: 200 } },
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [elements, setElements] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : initialElements
  );
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };
    setElements((es) => es.concat(newNode));
  };

  console.log(elements);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(elements));
  }, [elements]);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            defaultZoom={5}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStop={(e, node) => {
              let cloneState = [...elements];
              let newPos = cloneState.map((item) => {
                if (item?.id === node?.id) {
                  return {
                    ...item,
                    position: node?.position,
                  };
                } else {
                  return item;
                }
              });
              setElements(newPos);
            }}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};
export default DnDFlow;
