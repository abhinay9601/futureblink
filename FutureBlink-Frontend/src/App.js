import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import axios from "axios";
import ColdEmailNode from "./components/ColdEmailNode";
import WaitDelayNode from "./components/WaitDelayNode";
import LeadSourceNode from "./components/LeadSourceNode";
import AddLeadButton from "./widgets/AddLeadButton";
import ColdEmailButton from "./widgets/ColdEmailButton";
import WaitDelayButton from "./widgets/WaitDelayButton";
import DeleteNodeButton from "./widgets/DeleteNodeButton";
import SaveAndScheduleButton from "./widgets/SaveAndScheduleButton";

const MIN_DISTANCE = 100;

const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isFlowInitialized, setIsFlowInitialized] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const getValidPosition = () => {
    let x, y;
    let isValidPosition = false;
    while (!isValidPosition) {
      x = Math.random() * 400;
      y = Math.random() * 200;
      isValidPosition = nodes.every(
        (node) =>
          Math.sqrt((node.position.x - x) ** 2 + (node.position.y - y) ** 2) >=
          MIN_DISTANCE
      );
    }
    return { x, y };
  };

  const handleEmailContentChange = (nodeId, value) => {
    console.log(nodeId, value);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, value } }
          : node
      )
    );
  };

  const addLead = () => {
    if (!isFlowInitialized) {
      const leadSourcePosition = getValidPosition();
      const leadSourceNode = {
        id: "lead-source",
        type: "leadSource",
        position: leadSourcePosition,
        data: { label: "Lead Source",
          onChange: (content) => handleEmailContentChange(leadSourceNode.id, content),

        },
        
      };
      setNodes((nds) => nds.concat(leadSourceNode));

      const sequenceStartPosition = { x: 100, y: 200 };
      const sequenceStartNode = {
        id: "sequence-start",
        type: "default",
        position: sequenceStartPosition,
        data: { label: "Sequence Start" },
      };
      setNodes((nds) => nds.concat(sequenceStartNode));

      const leadSourceEdge = {
        id: `e${leadSourceNode.id}-sequence-start`,
        source: leadSourceNode.id,
        target: sequenceStartNode.id,
      };
      setEdges((eds) => eds.concat(leadSourceEdge));

      setIsFlowInitialized(true);
    } else {
      const leadSourcePosition = getValidPosition();
      const leadSourceNode = {
        id: `lead-source-${nodes.length + 1}`,
        type: "leadSource",
        position: leadSourcePosition,
        data: { label: "Lead Source",
          onChange: (content) => handleEmailContentChange(leadSourceNode.id, content),
         },
        
      };
      setNodes((nds) => nds.concat(leadSourceNode));

      const sequenceStartNode = nodes.find(
        (node) => node.id === "sequence-start"
      );
      if (sequenceStartNode) {
        const newEdge = {
          id: `e${leadSourceNode.id}-sequence-start`,
          source: leadSourceNode.id,
          target: sequenceStartNode.id,
        };
        setEdges((eds) => eds.concat(newEdge));
      }
    }
  };

  const addNode = (label) => {
    if (nodes.length === 0) {
      addLead();
    }

    const isFirstActionNode = nodes.every(
      (node) => node.type !== "coldEmail" && node.type !== "waitDelay"
    );

    const newPosition = getValidPosition();
    const newNode = {
      id: `${nodes.length + 1}`,
      type: label,
      position: newPosition,
      data: {
        label: `${label}`,
        emailRecipient: label === "coldEmail" ? "recipient@example.com" : "",
        waitTime: label === "waitDelay" ? 5 : 0,
        source: label === "leadSource" ? "Website" : "",
        onChange: (content) => handleEmailContentChange(newNode.id, content),
      },
    };

    setNodes((nds) => nds.concat(newNode));

    if (isFirstActionNode) {
      const sequenceStartNode = nodes.find(
        (node) => node.id === "sequence-start"
      );
      if (sequenceStartNode) {
        const newEdge = {
          id: `e${sequenceStartNode.id}-${newNode.id}`,
          source: sequenceStartNode.id,
          target: newNode.id,
        };
        setEdges((eds) => eds.concat(newEdge));
      }
    } else {
      const lastActionNode = nodes
        .slice()
        .reverse()
        .find((node) => node.type === "coldEmail" || node.type === "waitDelay");
      if (lastActionNode) {
        const newEdge = {
          id: `e${lastActionNode.id}-${newNode.id}`,
          source: lastActionNode.id,
          target: newNode.id,
        };
        setEdges((eds) => eds.concat(newEdge));
      }
    }
  };

  const deleteNode = () => {
    if (!selectedNode) {
      alert("No node selected to delete!");
      return;
    }

    if (selectedNode.id === "sequence-start") {
      alert('You cannot delete the "Sequence Start" node!');
      return;
    }

    const nodeId = selectedNode.id;
    const connectedEdges = edges.filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );

    const previousNodes = connectedEdges
      .filter((edge) => edge.target === nodeId)
      .map((edge) => edge.source);
    const nextNodes = connectedEdges
      .filter((edge) => edge.source === nodeId)
      .map((edge) => edge.target);

    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );

    previousNodes.forEach((prevNodeId) => {
      nextNodes.forEach((nextNodeId) => {
        const newEdge = {
          id: `e${prevNodeId}-${nextNodeId}`,
          source: prevNodeId,
          target: nextNodeId,
        };
        setEdges((eds) => eds.concat(newEdge));
      });
    });

    setSelectedNode(null);
  };

  const saveFlowchart = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/save-flow`,
        { nodes, edges },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${process.env.REACT_APP_API_KEY}`
          },
        }
      );
      alert("Flowchart saved and emails scheduled!");
    } catch (error) {
      console.error("Error saving flowchart:", error);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style:
            node.id === selectedNode?.id
              ? { border: "2px solid red", backgroundColor: "lightyellow" }
              : {},
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => setSelectedNode(node)}
      >
        <MiniMap />
        <Background />
        <Controls>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <AddLeadButton onClick={addLead} label="Add Lead"/>
            
            {isFlowInitialized && (
              <>
                <ColdEmailButton onClick={() => addNode("coldEmail")} label="Add Cold Email" />
                <WaitDelayButton onClick={() => addNode("waitDelay")} label="Add Wait/Delay" />
                <DeleteNodeButton onClick={deleteNode} label="Delete Node" />
              </>
            )}
            <SaveAndScheduleButton onClick={saveFlowchart} label="Save and Schedule Flow"/>
          </div>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default App;
